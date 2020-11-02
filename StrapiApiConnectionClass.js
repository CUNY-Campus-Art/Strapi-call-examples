class StrapiApiConnection {

  constructor() {
    this.strapiUrl = "https://dev-cms.cunycampusart.com"; //url to strapi API endpoint
    this.authToken = "";
    this.user = {}
  }

  /* getAllArtworks
  Function calls to strapi api to get all artworks in db

  Accepts:
   - none
  Returns:
  - JSON data for all artworks
  */
  getAllArtworks = async () => {
    const { data } = await axios.get(this.strapiUrl+'/artworks');
    console.log("getAllArtworks", data);
    return data;
  };

  /* getArtworkById
  Function calls to strapi api get entry for one artwork

  Accepts:
   - id - id of artwork entry
  Returns:
   - JSON data for the entry
  */
  getArtworkById = async (id) => {
    const { data } = await axios.get(this.strapiUrl+'/artworks/'+id);
    console.log("getArtworkById", data);
    return data;
  };

  /* getAllCampuses
  Function calls to strapi api to get all campuses in db

  Accepts:
   - none
  Returns:
   - JSON data for all campuses
  */
  getAllCampuses = async () => {
    const { data } = await axios.get(this.strapiUrl+'/campuses');
    console.log("getAllCampuses", data);
    return data;
  };

  /* getCampusById
  Function calls to strapi api get entry for one campus

  Accepts:
   - id - id of campus entry
  Returns:
   - JSON data for the entry
  */
  getCampusById = async (id) => {
    const { data } = await axios.get(this.strapiUrl+'/campuses/'+id);
    console.log("getCampusById", data);
    return data;
  };

  /* getArtworksInCampusByName
  Function calls to strapi api get all artwork entries associated to a campus using campus name

  Accepts:
   - campusName - name of campus (must be spelled correctly, capitalization doesnt matter)
  Returns:
   - JSON data for all artworks associated to the campus
  */
  getArtworksInCampusByName = async (campusName) => {
    const { data } = await axios.get(this.strapiUrl+'/artworks?campus.campus_name_contains='+campusName);
    console.log("getArtworksInCampusByName", data);
    return data;
  };

  /* getArtworksInCampusById
  Function calls to strapi api get all artwork entries associated to a campus using campus id

  Accepts:
   - campusId - id of campus entry
  Returns:
   - JSON data for all artworks associated to the campus
  */
  getArtworksInCampusById = async (campusId) => {
    const { data } = await axios.get(this.strapiUrl+'/artworks?campus.id='+campusId);
    console.log("getArtworksInCampusById", data);
    return data;
  };

  /* createArtwork
  Function calls to strapi API to create a new artwork entry

  Accepts:
    - token - authentication token that was retrieved from logging in
    - dataIn - data for a new artwork entry, example: {title: "new artwork from js", artist:"new artist", description:"test description", year: "2000"}
  Returns:
    - full post response from strapi api if successfull or -1 if failed
  */
  createArtwork = async (token, dataIn) => {
    const sendConfig = {
      headers: {
        'Authorization': "Bearer " + token,
        'Content-Type': 'application/json'
      }
    };
    const sendData = JSON.stringify(dataIn);
    const returnData = await this.axiosPostToStrapi(this.strapiUrl + '/artworks',sendData, sendConfig);
    return returnData;
  }

  /* updateArtworkById
  Function calls to strapi API to updat a artwork entry

  Accepts:
    - token - authentication token that was retrieved from logging in
    - id - id of artwork entry
    - dataIn - data for artwork entry, example: {title: "updated artwork from js"}
  Returns:
    - full post response from strapi api if successfull or -1 if failed
  */
  updateArtworkById = async (token, id, dataIn) => {
    const sendConfig = {
      headers: {
        'Authorization': "Bearer " + token,
        'Content-Type': 'application/json'
      }
    };
    const sendData = JSON.stringify(dataIn);
    const returnData = await this.axiosPutToStrapi(this.strapiUrl + '/artworks/' + id,sendData, sendConfig);
    return returnData;
  }

  /* deleteArtworkById
  Function calls to strapi API to delete a artwork entry

  Accepts:
    - token - authentication token that was retrieved from logging in
    - id - id of artwork entry
  Returns:
    - delete response from strapi API
  */
  deleteArtworkById = async (token, id) => {
    const sendConfig = {
      headers: {
        'Authorization': "Bearer " + token
      }
    };
    const returnData = await this.axiosDeleteFromStrapi(this.strapiUrl + '/artworks/' + id, sendConfig);
    return returnData;
  }

  /* createCampus
  Function calls to strapi API to create a new campus entry

  Accepts:
    - token - authentication token that was retrieved from logging in
    - dataIn - data for a new campus entry, example: {campus_name: "BMCC"}
  Returns:
    - full post response from strapi api if successfull or -1 if failed
  */
  createCampus = async (token, dataIn) => {
    const sendConfig = {
      headers: {
        'Authorization': "Bearer " + token,
        'Content-Type': 'application/json'
      }
    };
    const sendData = JSON.stringify(dataIn);
    const returnData = await this.axiosPostToStrapi(this.strapiUrl + '/campuses',sendData, sendConfig);
    return returnData;
  }

  /* updateCampusById
  Function calls to strapi API to updat a campus entry

  Accepts:
    - token - authentication token that was retrieved from logging in
    - id - id of artwork entry
    - dataIn - data for a new campus entry, example: {campus_name: "BMCC"}
  Returns:
    - full post response from strapi api if successfull or -1 if failed
  */
  updateCampusById = async (token, id, dataIn) => {
    const sendConfig = {
      headers: {
        'Authorization': "Bearer " + token,
        'Content-Type': 'application/json'
      }
    };
    const sendData = JSON.stringify(dataIn);
    const returnData = await this.axiosPutToStrapi(this.strapiUrl + '/campuses/' + id,sendData, sendConfig);
    return returnData;
  }

  /* deleteCampusById
  Function calls to strapi API to delete a campus entry

  Accepts:
    - token - authentication token that was retrieved from logging in
    - id - id of campus entry
  Returns:
    - delete response from strapi API
  */
  deleteCampusById = async (token, id) => {
    const sendConfig = {
      headers: {
        'Authorization': "Bearer " + token
      }
    };
    const returnData = await this.axiosDeleteFromStrapi(this.strapiUrl + '/campuses/' + id, sendConfig);
    return returnData;
  }


  /* loginUser
  Function calls to strapi api to login a user

  Accepts:
   - id - user id (email, username)
   - pw - password for the respective account
  Returns: login response if
  */
  loginUser = async (id, pw) => {
    const sendConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const sendData = JSON.stringify({
      identifier: id,
      password: pw,
    })

    const returnData = await this.axiosPostToStrapi(this.strapiUrl + '/auth/local',sendData, sendConfig);
    this.user = returnData.data.user;
    this.authToken = returnData.data.jwt;
    return returnData;

  }

  /* loginAndGetToken
  Function calls to strapi api to login a user and get authentication token that will be used for
  other calls to create, update, delete entries in database.

  Accepts:
   - id - user id (email, username)
   - pw - password for the respective account
  Returns: authentication token if call is completed succesfully or -1 if there was a error.
  */
  loginAndGetToken = async (id, pw) => {

    let returnData = await this.loginUser(id, pw);

    if(returnData.status == 200){
      return returnData.data.jwt;
    }else{
      return -1;
    }
  }

  axiosPostToStrapi = async (url, data, headerConfig) => {
    var returnedData = {status:-1};
    try {
      returnedData = await axios.post(url,data, headerConfig);
    } catch (error) {
      console.log(error);
      console.log(url);
      console.log(data);
      console.log(headerConfig);
    }

    if(returnedData.status == 200){
      return returnedData;
    }else{
      console.log('Error in axiosPostToStrapi');
      console.log(returnedData);
      return -1;
    }
  }

  /* axiosPutToStrapi
  Function makes a generic put call to strapi API using provided information

  Accepts:
    - url - API route for the post call
    - data - data to be sent with the post call
    - headerConfig - header data to be sent with the post call
  Returns: full post response from strapi api if successfull or -1 if failed
  */
  axiosPutToStrapi = async (url, data, headerConfig) => {
    var returnedData = {status:-1};
    try {
      returnedData = await axios.put(url,data, headerConfig);
    } catch (error) {
      console.log(error);
      console.log(url);
      console.log(data);
      console.log(headerConfig);
    }

    if(returnedData.status == 200){
      return returnedData;
    }else{
      console.log('Error in axiosPostToStrapi');
      console.log(returnedData);
      return -1;
    }
  }


  /* axiosDeleteFromStrapi
  Function makes a generic post delete to strapi API

  Accepts:
    - url - API route for the delete call
    - headerConfig - header data to be sent with the post call, contains auth token
  Returns: full post response from strapi api if successfull or -1 if failed
  */
  axiosDeleteFromStrapi = async (url, headerConfig) => {
    var returnedData = {status:-1};
    try {
      returnedData = await axios.delete(url, headerConfig);
    } catch (error) {
      console.log(error);
      console.log(url);
      console.log(data);
      console.log(headerConfig);
    }

    if(returnedData.status == 200){
      return returnedData;
    }else{
      console.log('Error in axiosDeleteFromStrapi');
      console.log(returnedData);
      return -1;
    }
  }

  /*axiosUploadToStrapi
  Function makes a generic post upload strapi API

  Accepts:
    - token - Authorization token
    - files - files to upload
    - entryId -  the id of the entry to associate to the file being upload
    - entryType -  the collection type of the entry being associated to the file (examples of collection types: artwork, campus)
    - entryFieldName -  the field name from the collection type (examples for artwork would be primary_image, other_images)
  Returns: full post response from strapi api if successfull or -1 if failed
  */
  axiosUploadToStrapi = async (token, file, entryId, entryType, entryFieldName) => {

    const sendConfig = {
      headers: {
        'Authorization': "Bearer " + token,
        'Content-Type': 'multipart/form-data'
      }
    };


    const formData = new FormData()
    formData.append('files', file)
    formData.append('ref', entryType) // optional, you need it if you want to link the image to an entry
    formData.append('refId', entryId) // optional, you need it if you want to link the image to an entry
    formData.append('field', entryFieldName) // optional, you need it if you want to link the image to an entry
    let returnedData = {};

    try {
      returnedData = await axios.post(`${this.strapiUrl}/upload`, formData, sendConfig);
    } catch (error) {
      console.log(error);
      // console.log(url);
      // console.log(data);
      // console.log(headerConfig);
    }

    if(returnedData.status == 200){
      return returnedData;
    }else{
      console.log('Error in axiosUploadToStrapi');
      console.log(returnedData);
      return -1;
    }
  }



}
