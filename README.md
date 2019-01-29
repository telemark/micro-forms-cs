[![Build Status](https://travis-ci.org/telemark/micro-forms-cs.svg?branch=master)](https://travis-ci.org/telemark/micro-forms-cs)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# micro-forms-cs

Forms for CS based on micro

## config docker.env

```bash
SSO_URL=https://sso.router.t-fk.win
ORIGIN_URL=https://cs-form.next.t-fk.no
JWT_SECRET=Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go
ENCRYPTOR_SECRET=Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go
SESSION_STORAGE_URL=https://tmp.storage.service.t-fk.no
CS_URL=https://cs-service.t-fk.no/createTicket
```

## API

### GET ```/```

Returns form if logged in. If not it redirects to auth.

### GET ```/ping```

Returns 
```JavaScript
{ ping: 'pong' }
```

## Screenshot

![alt text](http://bildr.no/image/SnB1RHlj.jpeg "CS")

## License

[MIT](LICENSE)

