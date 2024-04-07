<h1 style="text-align:center;">Find A Friend - Back End</h1>

<p>This is a solution from Rocketseat  to build a app to Adopt a Pet.</p>

<h2>About Project</h2>

<p>The Find A Friend Back-End is an API to register your ORG and the Pets that you want to put up to adoption, and with facilites the adopters can navigate to application and send messages to the orgs to adopt Pets</p>

<h3>Technologies</h3>

<img alt="NodeJs" src="./assets/node-js.png" style="width:50px;">
<img alt="Docker" src="./assets/docker.png" style="width:50px;">
<img alt="Postgresql" src="./assets/postgre.png" style="width:50px;">
<img alt="Typescript" src="./assets/typescript.png" style="width:50px;">

<h3>App Functionalities</h3>

<h4>Functional Requirements</h4>

[X] Regiter an ORG
[X] Login with an ORG
[X] Register a Pet
[] Register a Pet Photo
[] Search Pets from City and Length
[] Filter Pets from age, energy, independence, size, and cat or dog
[] Find A pet from Id

<h4>Business rules</h4>

[X] Can't register a Org with empty fields
[x] Can't register a Pet with empty fields
[X] Register a Org with Email Valid, WhatsApp with DDD and Cep with character especial -
[X] Can't register a Org with same Cep and email
[X] Can't authenticate a Org with invalid fields

<h4>Non-Functional Requirements</h4>

[X] Authentication with JWT Token
[X] Cryptography with bcrypt
[X] Data must be persisted in postgresql using container docker
[X] Identify Users with a UUID

<h3>Entities</h3>

[X] Orgs
    - Id
    - Charge
    - Email - unique
    - Cep - unique
    - Address
    - WhatsApp
    - Password
    - CreatedAt

[X] Pets
    - Id
    - Name
    - About
    - Age
    - Size
    - Energy
    - Independence
    - Ambiance 
    - OrgId
    - CreatedAt

[X] Photos 
    - Id
    - Photo
    - PetId
    - CreatedAt

[X] AdoptionRequirements
    - Id
    - Requirement
    - PetId
    - CreatedAt

