# Full Fledge TodoApp developed using MongoDb as database, Reactjs as Frontend, Appwrite for authentication 

![image](https://img.shields.io/badge/iNeuron-Full--Stack%20JavaScript%20Web%20Development%20Course-blue)
![image](https://img.shields.io/badge/Hitesh%20Choudhry-LOC-brightgreen)
![image](https://img.shields.io/badge/MERN_Stack-AppWrite-orange)
![image](https://img.shields.io/badge/Project-full_fledge_Todo_App-blue)

![image](https://img.shields.io/badge/Developed_by-Rohtash_Talan-E21717)


## About 
- This TodoApp took me almost 15 hours to develop it. 
- Todo app first took ask user to signin if account found it took him/her to Dashboard Page 
- On DashBoard page user can create Todo Title and then Task inside Todo. Todo/Task saved to mongodb as per schema [Todo Modal](./backened/model/todoModel.js)
- based on action performed by user Todo Updated/Deleted inside mongoDb and  element reload as, with every action
- To authenticate user Project use ![image](https://img.shields.io/badge/AppWrite-brightgreen) authentication
- this project also use Search Fetaure : 
    - Search feture first took userId from signIn session automatically
    - then `Query` entered by user along with `userId`  passed to backend
    - Backend TodoController search for query in `regex` format where userId is present to stop accessing other user any other document
    - it return array of result 
    - on frontend it showed to user if result are there or 'No result available message showed to user' 



## Technology used

### Backend 
 ![image](https://img.shields.io/badge/Mongoose-blue)
 ![image](https://img.shields.io/badge/ExpressJs-black)

### Frontend 
 ![image](https://img.shields.io/badge/React.Js-blue)
 ![image](https://img.shields.io/badge/TailWind-red)
 
 ### Database 
 ![image](https://img.shields.io/badge/MongoDB-blue)
 
  ### Authentication 
 ![image](https://img.shields.io/badge/AppWrite_Authentication-blue)
 