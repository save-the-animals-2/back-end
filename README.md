# Save The Animals v1.0.0

Backend Project for Lambda School's Build Week, deployed Link is https://save-the-animals-app.herokuapp.com/

- [Users](#users)
  - [Register New User](#register-new-user)
  - [Log In User](#log-in-user)
  - [Return User List](#return-user-list)
  - [Return User By Id](#return-user-by-id)
  - [Update User](#update-user)
  - [Delete User](#delete-user)
  - [Get User Favorite Campaigns](#get-user-favorite-campaigns)
  - [Add User Favorite Campaign](#add-user-favorite-campaign)
  - [Delete User Favorite Campaign](#delete-user-favorite-campaign)
- [Campaigns](#campaigns)
  - [Return Campaign List](#return-campaign-list)
  - [Return Campaign By Id](#return-campaign-by-id)
  - [Create New Campaign](#create-new-campaign)
  - [Update Campaign](#update-campaign)
  - [Delete Campaign](#delete-campaign)
- [Organizations](#organizations)
  - [Return Organization List](#return-organization-list)
  - [Return Organization By Id](#return-organization-by-id)
  - [Create New Organization](#create-new-organization)
  - [Update Organization](#update-organization)
  - [Delete Organization](#delete-organization)

# Users

## Register New User

    POST /api/register

### Parameters

| Name      | Type    | Description                                                              |
| --------- | ------- | ------------------------------------------------------------------------ |
| username  | String  | <p>The new users username _Required_ _Unique_</p>                        |
| email     | String  | <p>The new users email _Required_ _Unique_</p>                           |
| password  | String  | <p>The new users password _Required_</p>                                 |
| user_type | String  | <p>The user type, "organization", "supporter", or "admin" _Required_</p> |
| org_id    | Integer | <p>The users organization, required if user_type is "organization"</p>   |

### Success Response

```
{
  "message": "Welcome, <username>",
  "user": {
    "id": 1,
    "username": "test",
    "email": "test@test.biz",
    "user_type": "organization",
    "org_id": 1
  },
  "token": "somelongtokenstring"
}

```

## Log In User

    POST /api/login

### Parameters

| Name     | Type   | Description                            |
| -------- | ------ | -------------------------------------- |
| username | String | <p>Username of the user _Required_</p> |
| password | String | <p>Password of the user _Required_</p> |

### Success Response

```
{
  "message": "Welcome, <username>",
  "user": {
    "id": 1,
    "username": "test",
    "email": "test@test.biz",
    "user_type": "organization",
    "org_id": 1
  },
  "token": "somelongtokenstring"
}
```

### Error Response

Invalid username

```
{
  "message": "Username not found"
}
```

Invalid password

```
{
  "message": "Invalid password"
}
```

Missing username

```
{
  "message": "Username is required."
}
```

Missing password

```
{
  "message": "Password is required."
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
    "username": "test",
    "email": "test@test.biz",
    "user_type": "organization",
    "org_id": 1
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
  "username": "test",
  "email": "test@test.biz",
  "user_type": "organization",
  "org_id": 1
}
```

### Error Response

No user with specified id

```
{
  "message": "User not found"
}
```

No authorization token

```
{
  "message": "User not authenticated. Please log in and try again."
}
```

User_type is not "admin" or user_id does not match request id

```
{
  "message": "Access denied."
}
```

## Update User

    PUT /api/users/:id

### Parameters

| Name      | Type    | Description                                                              |
| --------- | ------- | ------------------------------------------------------------------------ |
| username  | String  | <p>The new users username _Required_ _Unique_</p>                        |
| email     | String  | <p>The new users email _Required_ _Unique_</p>                           |
| password  | String  | <p>The new users password _Required_</p>                                 |
| user_type | String  | <p>The user type, "organization", "supporter", or "admin" _Required_</p> |
| org_id    | Integer | <p>The users organization, required if user_type is "organization"</p>   |

### Success Response

user_type must be "admin" or user_id must match request id
Returns updated user object

```
{
  "id": 1,
  "username": "test",
  "email": "test@test.biz",
  "user_type": "organization",
  "org_id": 1
}
```

### Error Response

No user with specified id

```
{
  "message": "User not found"
}
```

No authorization token

```
{
  "message": "User not authenticated. Please log in and try again."
}
```

User_type is not "admin" or user_id does not match request id

```
{
  "message": "Access denied."
}
```

## Delete User

    DELETE /api/users/:id

### Success Response

user_type must be "admin"

Returns status 204 (no content)

### Error Response

No user with specified id

```

{
  "message": "User not found"
}

```

No authorization token

```

{
  "message": "User not authenticated. Please log in and try again."
}

```

User_type is not "admin"

```

{
  "message": "Admin access only."
}

```

## Get User Favorite Campaigns

    POST /api/users/:id/favorites

user_type must be "supporter", logged in user_id must match request id

### Success Response

returns user data and full list of favorite campaigns

```
{
  "id": 1,
  "username": "test",
  "email": "test@test.biz",
  "user_type": "organization",
  "org_id": null
  "favorite_campaigns": [
    {
      "id": 1,
      "title": "Conserving migrating raptors in western Georgia",
      "description": "The illegal trapping and sale of birds for falconry, a traditional practice in Georgia, pose a threat to raptor species. It is estimated that 200,000 birds are trapped each year with 5,000 being smuggled out of the country. For some species, birds regarded as low quality are also killed to remove them from populations. The illegal and unsustainable trade in raptors is significantly affecting a number of species including the saker falcon, Eurasian sparrowhawk, northern goshawk and peregrine falcon, which are targeted for falconry. FFI is seeking to address these threats by working closely with falconers’ associations and in cooperation with relevant government agencies to regulate the practice of falconry and to stop illegal international trade in birds of prey.",
      "photo_url": "https://cms.fauna-flora.org/wp-content/uploads/2017/11/conserving-migrating-raptors-in-western-georgia-2000x1200.jpg",
      "location": "Georgia, Eurasia",
      "species": "saker falcon, Eurasian sparrowhawk, northern goshawk and peregrine falcon",
      "urgency_level": 6,
      "funding_goal": 10000,
      "deadline": "2020-06-01T00:00:00.000Z",
      "org_id": 1,
      "org_name": "Fauna and Flora International"
    },
    ...

  ]
}
```

### Error Response

No user with specified id

```

{
"message": "User not found"
}

```

No authorization token

```

{
"message": "User not authenticated. Please log in and try again."
}

```

User_type is not "supporter", or user_id does not match request id

```

{
"message": "Access denied."
}

```

## Add User Favorite Campaign

    POST /api/users/:id/favorites

### Parameters

| Name        | Type    | Description                                                              |
| ----------- | ------- | ------------------------------------------------------------------------ |
| campaign_id | Integer | <p>Id of the campaign to add to the user's favorites list _Required_</p> |

user_type must be "supporter", logged in user_id must match request id

### Success Response

```
{
  "user_id": 1,
  "campaign_id": 2
}
```

### Error Response

No user with specified id

```

{
"message": "User not found"
}

```

No authorization token

```

{
"message": "User not authenticated. Please log in and try again."
}

```

User_type is not "supporter", or user_id does not match request id

```

{
"message": "Access denied."
}

```

## Delete User Favorite Campaign

    POST /api/users/:id/favorites/:campaignId

### Success Response

user_type must be "supporter", logged in user_id must match request id

Returns status 204 (no content)

### Error Response

No user with specified id

```

{
"message": "User not found"
}

```

No authorization token

```

{
"message": "User not authenticated. Please log in and try again."
}

```

User_type is not "supporter", or user_id does not match request id

```

{
"message": "Access denied."
}

```

# Campaigns

## Return Campaign List

    GET /api/campaigns

### Success Response

Returns full list of campaigns (no token required)

```

[
{
"id": 1,
"title": "Conserving migrating raptors in western Georgia",
"description": "The illegal trapping and sale of birds for falconry, a traditional practice in Georgia, pose a threat to raptor species. It is estimated that 200,000 birds are trapped each year with 5,000 being smuggled out of the country. For some species, birds regarded as low quality are also killed to remove them from populations. The illegal and unsustainable trade in raptors is significantly affecting a number of species including the saker falcon, Eurasian sparrowhawk, northern goshawk and peregrine falcon, which are targeted for falconry. FFI is seeking to address these threats by working closely with falconers’ associations and in cooperation with relevant government agencies to regulate the practice of falconry and to stop illegal international trade in birds of prey.",
"photo_url": "https://cms.fauna-flora.org/wp-content/uploads/2017/11/conserving-migrating-raptors-in-western-georgia-2000x1200.jpg",
"location": "Georgia, Eurasia",
"species": "saker falcon, Eurasian sparrowhawk, northern goshawk and peregrine falcon",
"urgency_level": 6,
"funding_goal": 10000,
"deadline": "2020-06-01T00:00:00.000Z",
"org_id": 1,
"org_name": "Fauna and Flora International"
},
...
]

```

## Return Campaign By Id

    GET /api/campaigns/:id

### Success Response

Returns specified campaign object (no token required)

```

{
"id": 1,
"title": "Conserving migrating raptors in western Georgia",
"description": "The illegal trapping and sale of birds for falconry, a traditional practice in Georgia, pose a threat to raptor species. It is estimated that 200,000 birds are trapped each year with 5,000 being smuggled out of the country. For some species, birds regarded as low quality are also killed to remove them from populations. The illegal and unsustainable trade in raptors is significantly affecting a number of species including the saker falcon, Eurasian sparrowhawk, northern goshawk and peregrine falcon, which are targeted for falconry. FFI is seeking to address these threats by working closely with falconers’ associations and in cooperation with relevant government agencies to regulate the practice of falconry and to stop illegal international trade in birds of prey.",
"photo_url": "https://cms.fauna-flora.org/wp-content/uploads/2017/11/conserving-migrating-raptors-in-western-georgia-2000x1200.jpg",
"location": "Georgia, Eurasia",
"species": "saker falcon, Eurasian sparrowhawk, northern goshawk and peregrine falcon",
"urgency_level": 6,
"funding_goal": 10000,
"deadline": "2020-06-01T00:00:00.000Z",
"org_id": 1,
"org_name": "Fauna and Flora International"
}

```

### Error Response

No campaign with specified id

```

{
"message": "Campaign not found"
}

```

## Create New Campaign

    POST /api/campaigns

### Parameters

| Name          | Type    | Description                                                          |
| ------------- | ------- | -------------------------------------------------------------------- |
| title         | String  | <p>Title of the campaign _Required_</p>                              |
| description   | String  | <p>Description of the campaign</p>                                   |
| photo_url     | String  | <p>Url for the campaign photo</p>                                    |
| location      | String  | <p>Location of the campaign _Required_</p>                           |
| species       | String  | <p>Species of the campaign _Required_</p>                            |
| urgency_level | Integer | <p>Urgency level of the campaign (1 = low, 10 = high) _Required_</p> |
| funding_goal  | Integer | <p>Funding goal of the campaign</p>                                  |
| deadline      | Date    | <p>Deadline of the campaign</p>                                      |
| org_id        | Integer | <p>The organization id of the logged in user _Auto Populated_</p>    |

### Success Response

Returns new campaign object

```

{
"id": 1,
"title": "Conserving migrating raptors in western Georgia",
"description": "The illegal trapping and sale of birds for falconry, a traditional practice in Georgia, pose a threat to raptor species. It is estimated that 200,000 birds are trapped each year with 5,000 being smuggled out of the country. For some species, birds regarded as low quality are also killed to remove them from populations. The illegal and unsustainable trade in raptors is significantly affecting a number of species including the saker falcon, Eurasian sparrowhawk, northern goshawk and peregrine falcon, which are targeted for falconry. FFI is seeking to address these threats by working closely with falconers’ associations and in cooperation with relevant government agencies to regulate the practice of falconry and to stop illegal international trade in birds of prey.",
"photo_url": "https://cms.fauna-flora.org/wp-content/uploads/2017/11/conserving-migrating-raptors-in-western-georgia-2000x1200.jpg",
"location": "Georgia, Eurasia",
"species": "saker falcon, Eurasian sparrowhawk, northern goshawk and peregrine falcon",
"urgency_level": 6,
"funding_goal": 10000,
"deadline": "2020-06-01T00:00:00.000Z",
"org_id": 1
}

```

### Error Response

No authorization token

```

{
"message": "User not authenticated. Please log in and try again."
}

```

User_type is "supporter" or "admin"

```

{
"message": "Access denied."
}

```

## Update Campaign

    POST /api/campaigns/:id

### Parameters

| Name          | Type    | Description                                                          |
| ------------- | ------- | -------------------------------------------------------------------- |
| title         | String  | <p>Title of the campaign _Required_</p>                              |
| description   | String  | <p>Description of the campaign</p>                                   |
| photo_url     | String  | <p>Url for the campaign photo</p>                                    |
| location      | String  | <p>Location of the campaign _Required_</p>                           |
| species       | String  | <p>Species of the campaign _Required_</p>                            |
| urgency_level | Integer | <p>Urgency level of the campaign (1 = low, 10 = high) _Required_</p> |
| funding_goal  | Integer | <p>Funding goal of the campaign</p>                                  |
| deadline      | Date    | <p>Deadline of the campaign</p>                                      |
| org_id        | Integer | <p>The organization id of the logged in user _Auto Populated_</p>    |

### Success Response

Returns new campaign object

```

{
"id": 1,
"title": "Conserving migrating raptors in western Georgia",
"description": "The illegal trapping and sale of birds for falconry, a traditional practice in Georgia, pose a threat to raptor species. It is estimated that 200,000 birds are trapped each year with 5,000 being smuggled out of the country. For some species, birds regarded as low quality are also killed to remove them from populations. The illegal and unsustainable trade in raptors is significantly affecting a number of species including the saker falcon, Eurasian sparrowhawk, northern goshawk and peregrine falcon, which are targeted for falconry. FFI is seeking to address these threats by working closely with falconers’ associations and in cooperation with relevant government agencies to regulate the practice of falconry and to stop illegal international trade in birds of prey.",
"photo_url": "https://cms.fauna-flora.org/wp-content/uploads/2017/11/conserving-migrating-raptors-in-western-georgia-2000x1200.jpg",
"location": "Georgia, Eurasia",
"species": "saker falcon, Eurasian sparrowhawk, northern goshawk and peregrine falcon",
"urgency_level": 6,
"funding_goal": 10000,
"deadline": "2020-06-01T00:00:00.000Z",
"org_id": 1
}

```

### Error Response

No authorization token

```

{
"message": "User not authenticated. Please log in and try again."
}

```

User_type is "supporter" or "admin"

```

{
"message": "Access denied."
}

```

No campaign with specified id

```

{
"message": "Campaign not found"
}

```

## Delete Campaign

    DELETE /api/campaigns/:id

### Success Response

Returns status 204 (no content)

### Error Response

No authorization token

```

{
"message": "User not authenticated. Please log in and try again."
}

```

User_type is "supporter" or "admin"

```

{
"message": "Access denied."
}

```

No campaign with specified id

```

{
"message": "Campaign not found"
}

```

# Organizations

## Return Organization List

    GET /api/organizations

### Success Response

Returns full list of organizations (no token required)

```

[
{
"id": 1,
"name": "Fauna and Flora International"
},
{
"id": 2,
"name": "Australian Wildlife Society"
},
{
"id": 3,
"name": "African Wildlife Foundation"
},
{
"id": 4,
"name": "Panthera"
}
]

```

## Return Organization By Id

    GET /api/organizations/:id

### Success Response

Returns all campaigns from the specified organization (no token required)

```

[
{
"id": 1,
"title": "Conserving migrating raptors in western Georgia",
"description": "The illegal trapping and sale of birds for falconry, a traditional practice in Georgia, pose a threat to raptor species. It is estimated that 200,000 birds are trapped each year with 5,000 being smuggled out of the country. For some species, birds regarded as low quality are also killed to remove them from populations. The illegal and unsustainable trade in raptors is significantly affecting a number of species including the saker falcon, Eurasian sparrowhawk, northern goshawk and peregrine falcon, which are targeted for falconry. FFI is seeking to address these threats by working closely with falconers’ associations and in cooperation with relevant government agencies to regulate the practice of falconry and to stop illegal international trade in birds of prey.",
"photo_url": "https://cms.fauna-flora.org/wp-content/uploads/2017/11/conserving-migrating-raptors-in-western-georgia-2000x1200.jpg",
"location": "Georgia, Eurasia",
"species": "saker falcon, Eurasian sparrowhawk, northern goshawk and peregrine falcon",
"urgency_level": 6,
"funding_goal": 10000,
"deadline": "2020-06-01T00:00:00.000Z",
"org_id": 1,
"org_name": "Fauna and Flora International"
},
...
]

```

### Error Response

No organization with specified id

```

{
"message": "Organization not found"
}

```

## Create New Organization

    POST /api/organizations

### Parameters

| Name | Type   | Description                                 |
| ---- | ------ | ------------------------------------------- |
| name | String | <p>Title of the organization _Required_</p> |

### Success Response

Returns new organization object

```

{
"id": 1,
"name": "Fauna and Flora International"
}

```

### Error Response

No authorization token

```

{
"message": "User not authenticated. Please log in and try again."
}

```

User_type is "supporter" or "organization"

```

{
"message": "Admin access only."
}

```

## Update organization

    POST /api/organizations/:id

### Parameters

| Name | Type   | Description                                 |
| ---- | ------ | ------------------------------------------- |
| name | String | <p>Title of the organization _Required_</p> |

### Success Response

Returns updated organization object

```

{
"id": 1,
"name": "Fauna and Flora International"
}

```

### Error Response

No authorization token

```

{
"message": "User not authenticated. Please log in and try again."
}

```

User_type is "supporter" or "organization"

```

{
"message": "Admin access only."
}

```

No organization with specified id

```

{
"message": "Organization not found"
}

```

## Delete organization

    DELETE /api/organizations/:id

### Success Response

Returns status 204 (no content)

### Error Response

No authorization token

```

{
"message": "User not authenticated. Please log in and try again."
}

```

User_type is "supporter" or "organization"

```

{
"message": "Admin access only."
}

```

No organization with specified id

```

{
"message": "Organization not found"
}

```

```

```
