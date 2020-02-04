How to get started:

1- Create the following table in Hasura:

```
messages: 
id - integer PK AI
created_by - text NOT_NULL
content - text NOT_NULL
created_at - timestamp with time zone, default: now()
```

2- Change https and wss addresses in Apollo `lib/graphql/client`