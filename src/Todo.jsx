import React, { useCallback, useEffect, useState } from "react";
import './todo.css'

function Todo(){
    const [item,addItem]=useState([])
    const [name,changName]=useState("")
    const [selected,selectedItem]=useState([])
    
    useEffect(()=>{ 
        const storedkeys=JSON.parse(localStorage.getItem("allKeys"))||[]
        const storedvalues=storedkeys.map((val,index)=>localStorage.getItem(val))
        if (storedvalues.length > 0) {
            addItem(storedvalues); // Populate the state with values from local storage
        }
        
    },[])  


    useEffect(()=>{
            item.forEach((value,index)=>{
                localStorage.setItem(index.toString(),value.toString())
            });
            const newkeys=item.map((value,index)=>index)
            localStorage.setItem("allKeys",JSON.stringify(newkeys))
            console.log(JSON.parse(localStorage.getItem("allKeys")))
        },[item])    

    function submitItem(event){
        addItem((item)=>[...item,name]) /* this will add items to items arrray*/          
    }
    
    function newItem(event){
        changName((name)=>event.target.value)

    }

    function removeItem(){
        addItem((item)=>item.filter((value,index,array)=>value!==name))
    }

    function check(event){
        selectedItem((selected)=>{
            if ([...selected].includes(parseInt(event.target.id))){
                return [...selected].filter((value,index)=>index!=parseInt(event.target.id))
            }
            else{
                return [...selected,parseInt(event.target.id)]
            }
            }
        )
        
    }
    
    function deleteSelect(){
        addItem((item)=>
            item.filter((value,index,array)=>!selected.includes(index))
        )
        selectedItem([])
    }
    
    return(
        <div className="to-do">
            <div className="listElements">
                <div className="input-add">
                <input className="" type="text" onChange={newItem}></input>
                <button onClick={submitItem}>ADD</button>
                </div>
                <div >
                    {item.map((value,index,array)=><div key={index} className="listItems">
                        <div><input type="checkbox" id={index} onChange={check} checked={selected.includes(index)}></input></div>
                        <p>{value.toString()}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="controls">    
                
                <button  onClick={deleteSelect}>DELETE</button>
            </div> 
        </div>
    )
}

export default Todo