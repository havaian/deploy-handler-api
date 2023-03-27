# LOAD ENVIRONMENTAL VARIABLES FROM .ENV FILES
include .env
export $(shell sed "s/=.*//" .env)

compose_up = docker-compose -f ./docker-compose.yml --env-file ./.env up
compose_build = docker-compose up --build -d --remove-orphans
compose_kill = docker-compose kill
compose_logs = docker-compose logs
#compose_save_logs = docker-compose logs -f > $(HANDLER_LOGS) || true
compose_rm = docker-compose rm -f
compose_ps = docker-compose ps
compose_deploy = \
	$(compose_kill) \
	$(compose_build) \
	$(compose_up) \
#	$(compose_save_logs)

dc_deploy:
#	$(compose_save_logs)
	$(compose_kill)
	$(compose_build)
	$(compose_up)
dc_up:
#	$(compose_save_logs)
	$(compose_up)
dc_logs:
	$(compose_logs)
dc_build:
#	$(compose_save_logs)
	$(compose_build)
dc_kill:
	$(compose_kill)
dc_ps:
	$(compose_ps)
dc_rm:
	$(compose_rm)
