
# back-end
=======
# Save The Animals v1.0.0

Backend Project for Lambda School's Build Week, deployed Link is https://save-the-animals-app.herokuapp.com/

- [Users](#users)
  - [Register New User](#register-new-user)
  - [Log In User](#log-in-user)
  - [Return User List](#return-user-list)
  - [Return User By Id](#return-user-by-id)
	

# Users

## Register New User

	POST /api/register


### Parameters

| Name          | Type        | Description                      |
|---------------|-------------|----------------------------------|
| username			| String			|  <p>The new users username *Required* *Unique*</p> |
| email			    | String			|  <p>The new users email *Required* *Unique*</p> |
| password			| String			|  <p>The new users password *Required*</p> |
| user_type			| String			|  <p>The user type, "organization", "supporter", or "admin" *Required*</p> |
| org_id			  | Integer			|  <p>The users organization, required if user_type is "organization"</p> |

### Success Response

```
{
  "username": "test",
  "email": "test@test.biz",
  "password": "abc123",
  "user_type": "organization",
  “org_id”: 1
}

```

## Log In User

	POST /api/login


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| username			| String			|  <p>Username of the user *Required*</p>							|
| password			| String			|  <p>Password of the user *Required*</p>							|

### Success Response

```
{
  "message": "Logged in",
  "user": 1,
  "token": String
}
```
### Error Response

Invalid username or password

```
{
     "message": "Invalid credentials, please check your username and password"
}
```

Missing username

```
{
     "message": "Username is required"
}
```

Missing password

```
{
     "message": "Password is required"
}
```

## Return User List

	GET /api/users

### Success Response

user_type must be "admin"
Returns full list of users

```
[
  {
    "id": 1,
    "username": "ruth",
    "email": "ruth@dev.biz",
    "user_type": "admin"
  },
  ...
]
```

### Error Response

Invalid user type ("supporter" or "organization")

```
{
     "message": "Admin access only."
}
```

No authorization token

```
{
  "message": "User not authenticated. Please log in and try again."
}
```

## Return User By Id

	GET /api/users/:id

### Success Response

user_type must be "admin" or user_id must match request id
Returns specified user object

```
{
  "id": 1,
  "username": "ruth",
  "email": "ruth@dev.biz",
  "user_type": "admin"
}
```

### Error Response

Invalid permissions (not "admin" or user_id is not the same as logged in user)

```
{
     "message": "Access denied."
}
```

No authorization token

```
{
  "message": "User not authenticated. Please log in and try again."
}
```
