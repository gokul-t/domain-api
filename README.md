## domain-api

Handle dynamic domains in Express.js. Perfect for when you have customized domains for different users, and need to handle them within your Node app.

Requests to foo.com can be handled with using the route /domain/:domain

Paths and query strings and paths remain intact. For example:

foo.com/post/cat?oh=hai can be handled with using the route /domain/foo.com/post/cat?oh=hai


## Installation

npm install domain-api --save

## usage

Require the module in app.js:

var domain = require('domain-api')

Use the module in middleware:

app.use(domain(opts))

## options

| Key       	| Type    		| Default   | Description            |
| ------------- | ------------- | --------  | ---------------------- |
| namespace 	| String  		| 'domain'  | Prepended to the path  |
| excludeDomain | String/Array  | []    	| Ignore domain 		 |

Example options:

```
app.use(domain({
  namespace: 's',
  excludeDomain: 'mydomain.com',
}))
```

Handle the new route for your domain, for example `foo.com` would be handled with:

```
app.get('/s/foo.com/', function(req, res){
  res.send("Meow!")
})
```