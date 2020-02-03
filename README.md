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

| Name     | Type   | Description                            |
| -------- | ------ | -------------------------------------- |
| username | String | <p>Username of the user _Required_</p> |
| password | String | <p>Password of the user _Required_</p> |

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
    "deadline": "06-01-2020",
    "org_id": 1,
    "org_name": "Fauna and Flora International"
  },
  ...
]
```

## Return Campaign By Id

    GET /api/campaigns/:id

### Success Response

Returns specified campaign object

```
{
  "id": 2,
  "title": "Conserving wild pollinators and increasing food security",
  "description": "As a society we are increasingly dependent on pollinators. The proportion of global agricultural production that depends on pollinators has increased four-fold since 1961. Much of this dependence is linked to wild pollinators. Where there are data on the status of pollinators, national or regional assessments show declines in the abundances of many wild bee and butterfly species, with a third or more facing local extinction. This could represent an unidentified risk – a pollination deficit – within agricultural supply chains. Focusing on the procurement of pollinator-dependent crops, the purpose of this project, which brings together FFI, UNEP-WCMC, the Cambridge Institute for Sustainability Leadership and the University of East Anglia, is to catalyse private sector action to support the conservation of wild pollinator populations. To date we have analysed existing company action on pollination through interviews, surveys and benchmarking, assessed the vulnerability of the top 15 pollinator food crops, strengthened the business case to act and outlined a road map to enable sustainable pollinator management within supply chains.",
  "photo_url": "https://cms.fauna-flora.org/wp-content/uploads/2017/11/conserving-wild-pollinators-and-increasing-food-security-2000x1200.jpg",
  "location": "Worldwide",
  "species": "pollinators",
  "urgency_level": 8,
  "funding_goal": 15000,
  "deadline": "12-31-2020",
  "org_id": 1,
  "org_name": "Fauna and Flora International"
}
```

## Create Campaign

    POST /api/campaigns

### Parameters

| Name          | Type    | Description                                                            |
| ------------- | ------- | ---------------------------------------------------------------------- |
| title         | String  | <p>The new campaign title _Required_</p>                               |
| description   | String  | <p>The new campaign description</p>                                    |
| photo_url     | String  | <p>Url of the campaign photo</p>                                       |
| location      | String  | <p>The new campaign location _Required_</p>                            |
| species       | String  | <p>The new campaign species _Required_</p>                             |
| urgency_level | Integer | <p>The new campaign urgency level (1-10) _Required_</p>                |
| funding_goal  | Integer | <p>The new campaign funding goal _Required_</p>                        |
| date          | Date    | <p>The new campaign fundraising deadline ("MM-DD-YYYY") _Required_</p> |

### Success Response

user_type must be "organization"
Returns newly created campaign object

```
{
  "id": 2,
  "title": "Conserving wild pollinators and increasing food security",
  "description": "As a society we are increasingly dependent on pollinators. The proportion of global agricultural production that depends on pollinators has increased four-fold since 1961. Much of this dependence is linked to wild pollinators. Where there are data on the status of pollinators, national or regional assessments show declines in the abundances of many wild bee and butterfly species, with a third or more facing local extinction. This could represent an unidentified risk – a pollination deficit – within agricultural supply chains. Focusing on the procurement of pollinator-dependent crops, the purpose of this project, which brings together FFI, UNEP-WCMC, the Cambridge Institute for Sustainability Leadership and the University of East Anglia, is to catalyse private sector action to support the conservation of wild pollinator populations. To date we have analysed existing company action on pollination through interviews, surveys and benchmarking, assessed the vulnerability of the top 15 pollinator food crops, strengthened the business case to act and outlined a road map to enable sustainable pollinator management within supply chains.",
  "photo_url": "https://cms.fauna-flora.org/wp-content/uploads/2017/11/conserving-wild-pollinators-and-increasing-food-security-2000x1200.jpg",
  "location": "Worldwide",
  "species": "pollinators",
  "urgency_level": 8,
  "funding_goal": 15000,
  "deadline": "12-31-2020",
  "org_id": 1,
  "org_name": "Fauna and Flora International"
}
```
