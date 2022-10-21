# Note: you can run this with `tilt up -f tilt.py`

docker_prune_settings ( max_age_mins = 5 , num_builds = 1 , keep_recent = 1 )

k8s_yaml('deploy.yaml')
k8s_resource('example-deployment', port_forwards=3000)

docker_build('tilt-monorepo', '.',
    entrypoint = 'yarn start:dev',
    live_update = [
        sync('.', '/project'),
        run('date +%s > start-time.txt', trigger = '.'),
        run('cd /project && yarn', trigger=['package.json', './yarn.lock', 'libs/*/package.json', 'services/*/package.json']),
        run('cd /project && yarn build:libs', trigger='libs'),
        run('cd /project && touch services/example/src/main.ts', trigger=['./start-time.txt']),
])
