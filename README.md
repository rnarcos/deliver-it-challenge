# Desafio técnico de ReactJS.

## Portal de Feedbacks

### **Goal**
This challenge's goal is to build a feedback portal in ReactJS where people can annonymously comment on their co-workers page. No layout will be defined, it's up to the developer to create the layout as wished.


### **Collaborator List**

* Populate the collaborators list.
* List name, company and role for each collaborator.
* Paginar a listagem, com limite de 10 colaboradores por página
* Paginate the list, limiting 10 collaborators per page.
* When clicking on a collaborator, redirect to it's detail screen.

### **Collaborator Detail**

* Populate the screen with the collaborator details.
* Populate the collaborator feedback list.
* Allow creation of a new feedback for the collaborator.
* Allow likes incremention for a previously created feedback.
* Allow deleting a feedback created within 5 minutes.
* Paginate the feedback list, limiting 20 feedbacks per page.

<br />

This app is currently hosted at: https://rnarcos-react-evaluation-app.netlify.app/

----

<br />

## API:
_Base URL_: http://5d8b64ad3c0aaf0014342c2a.mockapi.io/api/v1

**1. Retrieve all collaborators list**
----
  _Endpoint to fetch the collaborators List._

* **Resource URL**

  _/collaborator_

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** _200_ <br />
  * **Content:** 
    ```json
    [
      {
        "id": "1",
        "createdAt": "2019-09-25T00:29:47.689Z",
        "name": "Felipe",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/happypeter1983/128.jpg",
        "company": "Wyman Group",
        "role": "Liaison"
      },
      {
        "id": "2",
        "createdAt": "2019-09-24T20:55:20.489Z",
        "name": "Dorothea Hansen",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/adobi/128.jpg",
        "company": "Cummerata, Upton and Gulgowski",
        "role": "Analyst"
      },
      //...
    ]
    ```

**2. Retrieve a collaborator details**
----
  Endpoint to fetch a collaborator details.

* **Resource URL**

  _/collaborator/{collaboratorId}_

* **Method:**

  `GET`

*  **URL Params**
 
   `collaboratorId=[string]`

* **Success Response:**
  
  * **Code:** _200_ <br />
  * **Content:** 
    ```json
    {
      "id": "51",
      "createdAt": "2019-09-24T23:36:26.864Z",
      "name": "Felipe",
      "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/happypeter1983/128.jpg",
      "company": "Wyman Group",
      "role": "Liaison"
    }
    ```

**3. Retrieve a collaborator feedbacks list**
----
  Endpoint to fetch a list of feedbacks from a collaborator.

* **Resource URL**

  _/collaborator/{collaboratorId}/feedback/{feedbackId}_

* **Method:**

  `GET`

*  **URL Params**
 
   `collaboratorId=[string]`

   `feedbackId=[string]`

* **Success Response:**
  
  * **Code:** _200_ <br />
  * **Content:** 
    ```json
    [
      {
        "id": "1",
        "collaboratorId": "1",
        "createdAt": "2019-09-24T17:06:22.988Z",
        "message": "monitor connecting Extended",
        "like": 2
      },
      {
        "id": "2",
        "collaboratorId": "1",
        "createdAt": "2019-09-24T17:06:22.988Z",
        "message": "monitor connecting Extended",
        "like": 2
      },
      //...
    ]
    ```

**4. Like a collaborator feedback**
----
  Endpoint to update the data from feedback to a collaborator.

* **Resource URL**

  _/collaborator/{collaboratorId}/feedback/{feedbackId}_

* **Method:**

  `PUT`

*  **URL Params**
 
   `collaboratorId=[string]`

   `feedbackId=[string]`


* **Data Params**

  * **Content:**
      ```json
      {
        "like": 10,
      }
      ```


* **Success Response:**
  
  * **Code:** _200_ <br />
  * **Content:** 
    ```json
    {
      "id": "1",
      "collaboratorId": "1",
      "createdAt": "2019-09-24T17:06:22.988Z",
      "message": "monitor connecting Extended",
      "like": 10
    }
    ```

**5. Create a collaborator feedback**
----
  Endpoint to create a feedback to a collaborator.

* **Resource URL**

  _/collaborator/{collaboratorId}/feedback/{feedbackId}_

* **Method:**

  `POST`

*  **URL Params**
 
   `collaboratorId=[string]`

   `feedbackId=[string]`


* **Data Params**

  * **Content:**
      ```json
      {
        "message": "monitor connecting Extended",
        "like": 0,
      }
      ```


* **Success Response:**
  
  * **Code:** _200_ <br />
  * **Content:** 
    ```json
    {
      "id": "51",
      "collaboratorId": "1",
      "createdAt": "2019-09-25T07:53:06.710Z",
      "message": "monitor connecting Extended",
      "like": 0
    }
    ```

**6. Delete a collaborator feedback**
----
  Endpoint to delete a collaborator feedback.

* **Resource URL**

  _/collaborator/{collaboratorId}/feedback/{feedbackId}_

* **Method:**

  `DELETE`

*  **URL Params**
 
   `collaboratorId=[string]`

* **Success Response:**
  
  * **Code:** _200_ <br />
  * **Content:** 
    ```json
    {
      "id": "51",
      "collaboratorId": "1",

      "createdAt": "2019-09-25T07:53:06.710Z",
      "message": "monitor connecting Extended",
      "like": 2
    }
    ```
