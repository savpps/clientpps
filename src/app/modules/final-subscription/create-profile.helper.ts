interface  IProfile{
    id:                string;
    lastName:          string;
    firstName:         string;
    birthday:          Date;
    profession:        string;
    country:           string;
    town:              string;
    genre:             string;
    createdAt:         Date 
    updatedAt:         Date
}

const inits : IProfile = {
    id:"",
    lastName:"", 
    firstName:"",
    birthday: new Date,         
    profession:"",
    country:"",  
    town:"",     
    genre:"",
    createdAt: new Date,
    updatedAt: new Date        
}

export {IProfile,inits}