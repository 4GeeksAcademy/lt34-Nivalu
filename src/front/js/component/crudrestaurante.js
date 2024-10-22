import React from "react";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Router } from "react-router-dom";



export const Crudrestaurante = () => {
    const [inputName, setInputname] = useState("")
    const [inputEmail, setInputEmail] = useState("")
    const [inputPhone, setInputPhone] = useState("")
    const [inputAddress, setInputAddress] = useState("")
    const [inputUserName, setInputUserName] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    const [inputGuestCapacity, setInputGuestCapacity] = useState("")

	const { store, actions } = useContext(Context);
    const [restaurants,  setRestaurants]  = useState([])
    const [contactId, setContactId] = useState([])



    const loadSomeData = () => {
        console.log("Se cargó la página");
        fetch("https://cuddly-waffle-5g9r4r6qrjxf7p45-3001.app.github.dev/api/restaurants")
            .then((response) => response.json())
            .then((data) => {
                setRestaurants(data);  
            })
            .catch((error) => console.error("Error al cargar los restaurantes:", error));
    };

    useEffect(() => {
        if (restaurants.length > 0) {
            console.log("Restaurantes cargados:", restaurants);
        }
    }, [restaurants]);

    useEffect(() => {
        loadSomeData();  
    }, []);

    function removeContact (idToDelete)  {
        fetch("https://cuddly-waffle-5g9r4r6qrjxf7p45-3001.app.github.dev/api/restaurant/" + idToDelete, 
            {
                method: "DELETE",
                redirect: "follow"
            }
        )
            .then((response) => response.text())
            .then(()=> loadSomeData())
    }

    function addNewContact (email, guests_capacity, location, name, phone_number, user_name,password) {
        fetch('https://cuddly-waffle-5g9r4r6qrjxf7p45-3001.app.github.dev/api/signup/restaurant',
            {method: 'POST', 
             headers: {"Content-Type": "application/json"},
             body: JSON.stringify({
                "email": email,
                "guests_capacity": guests_capacity,
                "location": location,
                "name": name,
                "phone_number": phone_number,
                "user_name": user_name,
                "password": password
            
            }),
            redirect: "follow"
            } )
            .then((response) => response.text())
            .then(()=> loadSomeData())
    }

    function idContactToPost (id) {
        setContactId(id)
        console.log("se editará " + id )
    }
     
    function putContact (email, guests_capacity, location, name, phone_number, user_name, password) {
        const store = getStore();
        console.log("el array tiene " + contactId)
        fetch("https://cuddly-waffle-5g9r4r6qrjxf7p45-3001.app.github.dev/api/restaurant/" + contactId,
            {method: 'PUT', 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    "email": email,
                    "guests_capacity": guests_capacity,
                    "location": location,
                    "name": name,
                    "phone_number": phone_number,
                    "user_name": user_name,
                    "password": password
               }),
               redirect: "follow"
               })
                .then((response) => response.text())
                .then(() => loadSomeData())
    
    }
    return (<>
        <ul className="list-group">
				{restaurants.map((item, index) => {
					return (
						<li key={index} className="list-group-item d-flex justify-content-between">
							<div className="d-flex">
								<img
									src="https://plus.unsplash.com/premium_photo-1689565611422-b2156cc65e47?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
									style={{ width: "150px", height: "150px", borderRadius: "150px", objectFit: "cover" }}
								/>

								<div style={{ marginLeft: "10px", display: "flex", flexDirection: "column", padding: "5px" }}>
									<h3>{item.name}</h3>

									<div style={{ display: "flex" }}>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
											<path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
										</svg>
										<p style={{ marginBottom: "0", marginLeft: "5px" }}>{item.location}</p>
									</div>

									<div className="d-flex">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
											<path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
										</svg>
										<p style={{ marginBottom: "0", marginLeft: "5px" }}>{item.phone_number}</p>
									</div>

									<div className="d-flex">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
											<path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
										</svg>
										<p style={{ marginBottom: "0", marginLeft: "5px" }}>{item.email}</p>
									</div>
								</div>
							</div>
							
							<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                                <Link  to={"/restaurant/" + item.id}>
                                    <button style={{backgroundColor:"white", border: "0px"}}>
                                        ver mas
                                    </button>
                                </Link>
                                <Link to={"/edit/restaurant/"+ item.id}>
                                        <button onClick={()=> idContactToPost(item.id)} style={{backgroundColor:"white", border: "0px"}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16" style={{ marginRight: "25px" }}>
                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                            </svg>
                                        </button>
                                </Link>

                                        <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{backgroundColor:"white", border: "0px", marginRight: "25px"}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                            </svg>
                                        </button>
                                    

								<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
									<div className="modal-dialog">
										<div className="modal-content">
										<div className="modal-header">
											<h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure?</h1>
											<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
										</div>
										<div className="modal-body">
											If you delete this thing the entire universe will go down!
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Oh no!</button>
											<button type="button" className="btn btn-primary" onClick={()=> removeContact(item.id)}>Yes baby!</button>
										</div>
										</div>
									</div>
								</div>
							</div>
						</li>
					);
				})}
			</ul>

            <div className="container" style={{ backgroundColor: "white", width: "70%", paddingBottom: "10%" }}>
            <h1 style={{ marginLeft: "30%" }}>Add a new Restaurant</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="Email" placeholder="Email"  onChange={(e) => setInputEmail(e.target.value)} value={inputEmail} />
                </div>                <div className="mb-3">
                    <label htmlFor="guestscapacity" className="form-label">Guests capacity</label>
                    <input type="text" className="form-control" id="guestscapacity" placeholder="Guests capacity"  onChange={(e) => setInputGuestCapacity(e.target.value)} value={inputGuestCapacity} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Adress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="Adress" placeholder="Address"  onChange={(e) => setInputAddress(e.target.value)} value={inputAddress} />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Name"   
                            onChange={(e) => setInputname(e.target.value)} value={inputName}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Phone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="Phone" placeholder="Phone"  onChange={(e) => setInputPhone(e.target.value)} value={inputPhone} />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">User name</label>
                    <input type="text" className="form-control" id="username" placeholder="User name"  onChange={(e) => setInputUserName(e.target.value)} value={inputUserName} />
                </div><div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="text" className="form-control" id="password" placeholder="Password"  onChange={(e) => setInputPassword(e.target.value)} value={inputPassword} />
                </div>
                <button onClick={()=> {
                   /* if(contactId.length == 1){
                        putContact(inputEmail, inputGuestCapacity, inputAddress, inputName, inputPhone, inputUserName, inputPassword)
                        setContactId([]) 
                    } else {
                        addNewContact(inputEmail, inputGuestCapacity, inputAddress, inputName, inputPhone, inputUserName, inputPassword)
                    }*/
                    addNewContact(inputEmail, inputGuestCapacity, inputAddress, inputName, inputPhone, inputUserName, inputPassword)
                    setInputGuestCapacity("");
                    setInputUserName("")
                    setInputname(""); 
                    setInputPhone("");
                    setInputEmail("") ; 
                    setInputAddress("")}} 
                    
                    type="submit" className="btn btn-primary w-100 mb-4">Save</button>
            </form>
        </div>
    </>

        
    );
};