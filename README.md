# YNH Identity Manager

## Your Name Here (YNH)

![alt text](src/assets/ynhIDP.gif)

## This is a basic identity manager that leverages the auth-service and a SQLite3 (backend)

## INSTALLATION

- clone this repository along with the "secure-auth-service" repo
- build both the auth service and the YNH-Identity-Manager (docker build --tag container-name .)
- check out the docker-compose.yaml file in the auth-svc dir to match container names on builds
  - should be the following:
    - ynhidp    - YNH-Identity-Manager
    - redis     - redis cache for storing cookies and session uuid
    - auth-svc  - auth service

- for example, for the auth service, from the source directory use:

```console
 docker build --tag auth-svc . --no-cache
 ```

 once completed you may run

 ```console
 docker images
 ```

 and see the following images

 ```console
auth-svc                                                         latest                                           fd0b2f359f1b   17 hours ago    25MB
ynhidp                                                           latest                                           6324031f67c8   17 hours ago    23.6MB
golang                                                           alpine                                           3dae2ccc15b8   3 weeks ago     299MB
alpine                                                           latest                                           e50c909a8df2   4 weeks ago     5.61MB
redis                                                            latest                                           621ceef7494a   6 weeks ago     104MB
```

once you have these you can go back into the directory for the secure-auth-service and run

```console
 docker-compose up -d --remove-orphans
```

and the containers should be up and it should look something like this

```console
CONTAINER ID   IMAGE      COMMAND                  CREATED             STATUS             PORTS                            NAMES
3b828052f7e5   auth-svc   "./auth-svc"             About an hour ago   Up About an hour   0.0.0.0:4000->4000/tcp           idp_svc
78999392638e   redis      "docker-entrypoint.s…"   About an hour ago   Up About an hour   0.0.0.0:6379->6379/tcp           reddis_cache
84f5a1d325f7   ynhidp     "/docker-entrypoint.…"   About an hour ago   Up About an hour   80/tcp, 0.0.0.0:8888->8888/tcp   idp_ui
```

you should then be able to access the ui on port 8888

### default login is admin:admin

## Things to keep in mind

- keep in mind if you delete the admin role you will be locked out of the UI. Only admin role holders can login
- the sqlite database exist in the data/db folder and has no authentication since its sqlite3
- you can look in the accounts table to see the default accounts.
- if you get locked out you can either edit the sqlite table directly or delete the database and restart the auth-svc container
- only admin role holders can login to the ui. all other accounts are client application accounts for an application ui consuming the auth service

## Enjoy
