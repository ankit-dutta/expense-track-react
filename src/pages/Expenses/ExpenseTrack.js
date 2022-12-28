import { useEffect, useRef, useState } from "react";
import ExpenseList from "./ExpenseList";


const ExpenseTrack = () => {

  const dummyExpense = [
    {
      id : "a1",
      money: "100",
      description: "For health and school",
      category: "others",
    }
  ]

  const [expense , setExpense] = useState([dummyExpense]);
  const [reload,setReload] = useState(false)


    const amountRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();

    //GET REQUEST
    useEffect(()=>{
      fetch(`https://expense-track-react-default-rtdb.firebaseio.com/Expenses.json`,{
      method : 'GET',
      headers :{
        "Content-Type" : "application/json",
      }
    }).then((res)=>{
      if(res.ok){
        console.log(res);
        return res.json();
      }
    }).catch((err)=>{
      console.log(err)
    }).then((data)=>{
      console.log(data);

      const storeData = [];
      
      for(let key in data){
        console.log(key);

        let d = {
          id : key,
          money : data[key].money,
          description : data[key].description,
          category : data[key].category
        }

        storeData.unshift(d)  //pusing the elemets in storedata arr at starting
      }

      setExpense([...storeData]);
      console.log(storeData)
    });
    },[reload])
    


    const addexpenseHandler = (event) =>{
          event.preventDefault()
        const enteredAmount = amountRef.current.value;
        const enteredDescription = descriptionRef.current.value;
        const enteredCategory = categoryRef.current.value;

        console.log("submit", enteredAmount,enteredCategory,enteredDescription)

      const newExpense = {
        id : Math.random().toString(),
        money : enteredAmount,
        description : enteredDescription,
        category : enteredCategory
      }
       
      
      // POST REQUEST

      fetch('https://expense-track-react-default-rtdb.firebaseio.com/Expenses.json',{
        method: "POST",
        body: JSON.stringify(newExpense),
        headers : {
          "Content-Type" : "application/json",
        },
      }).then((res)=>{
        if(res.ok){
          alert("data sent to the backend");
           console.log(res);
           return res.json();
        }else{
          return res.json(data =>{
            throw new Error (data.error.message);
          })
        }
      })

        amountRef.current.value = "";
        descriptionRef.current.value = "";
        categoryRef.current.value = "";
    }

    return(
        <>
          <h1>expense page</h1>

          <form onSubmit={addexpenseHandler}>

            <label>Money Spent</label>
            <input type = 'number' ref={amountRef} />

            <br />
            <label>Description</label>
            <input type = "text" ref={descriptionRef} />

            <label for="category">Choose a category:</label>

            <select name="category" id="category" ref={categoryRef}>
            <option value="food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Movie">Movie</option>
           
            </select>

            <br />

            <button type="submit">Submit</button>
            
          </form>

        <ExpenseList items = {expense} />

         


        </>
    )
}

export default ExpenseTrack;