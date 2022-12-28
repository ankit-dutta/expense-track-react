import { useEffect,  useState } from "react";
import './ExpenseTrack.css'

const ExpenseTrack = () => {


  const [expense , setExpense] = useState([]);
  const [category, setCategory] = useState("");
  const [amount,setAmount] = useState("");
  const [description,setDescription] = useState("");
  const [editId , setEditId] = useState("");
  const [editForm, setEditForm] = useState(false);
  const [reload,setReload] = useState(false)

  const moneyHandler = (event) => {
    setAmount(event.target.value);
  };

  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const categoryHandler = (event) => {
    setCategory(event.target.value);
  };
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
          amount : data[key].amount,
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


      const expenseData = {
          amount,
          description,
          category
      
      };
       
      
      // POST REQUEST
      if(editId){
        fetch(`https://expense-track-react-default-rtdb.firebaseio.com/Expenses/${editId}.json`,{
          method:"PUT",
          body: JSON.stringify(expenseData),
          headers : {
            "Content-Type" : "application/json",
          },
        }).then((res)=>{
          if(res.ok){
            setReload(true);
          }
        });
      }else{
      fetch('https://expense-track-react-default-rtdb.firebaseio.com/Expenses.json',{
        method: "POST",
        body: JSON.stringify(expenseData),
        headers : {
          "Content-Type" : "application/json",
        },
      }).then((res)=>{
        if(res.ok){
          alert("data sent to the backend");
           console.log(res);
           setReload(true)
           return res.json();
        }else{
          return res.json(data =>{
            throw new Error (data.error.message);
          })
        }
      }).catch(err=>{
        alert(err.message);
      })

    }
    }

    //Delete 

    const deleteListHandler = (id) =>{
        const deleted = expense.filter((item)=>{
          return item.id !== id;
        });
        setExpense(deleted);
        console.log(deleted);

        fetch(`https://expense-track-react-default-rtdb.firebaseio.com/Expenses/${id}.json`,{
          method :"DELETE",
          headers:{
            "Content-Type": "application/json"
          }

        }).then((res)=>{
          if(res.ok){
            alert("Expense Deleted");
            return res.json();
          }else {
            return res.json((data)=>{
              throw new Error(data.err.message);
            })
          }
        })
    }

    const editHandler = (editId) => {
      console.log(editId);
      setEditId(editId);
      setEditForm(true);

      const editData = expense.filter((item)=>{
        return item.id === editId;
      })

      console.log(editData);

      editData.map((item)=>{
        setAmount(item.amount);
        setCategory(item.category);
        setDescription(item.description);
        return;
      })
    }

    

    return(
        <>
          <h1>expense page</h1>

        <center>
          <form onSubmit={addexpenseHandler}>

            <label><strong>Money Spent</strong></label> &nbsp; &nbsp;
            <input id= "expenseMoney" type = 'number' value = {amount}  onChange={(event) => moneyHandler(event)} />

            <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label><strong>Description</strong></label>&nbsp; &nbsp; &nbsp;
            <input id="expenseDescription" type = "text" value={description} onChange = {(event) => {descriptionHandler(event)}} />

            <br />

            <label for="category"><strong>Select category</strong></label>&nbsp; &nbsp;

            <select name="category" id="expenseCategory" value={category} onChange={(event) => categoryHandler(event)}>
            <option value="food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Movie">Movie</option>
           
            </select>

            <br />

            <button type="submit">Submit</button>
            
          </form>
         


        <h1>Records</h1>
        {expense.map((item)=>{
          return (
            <ul start = "circle" className="expense-list-container" key={item.id}>
              <li className="expense-list">Money : {item.amount} ||  Description: {item.description} || Category: {item.category} </li>
              <button className="edit-btn" onClick={() => editHandler(item.id)}>Edit</button> &nbsp; &nbsp;
              <button className="delete-btn" onClick={() => deleteListHandler(item.id)}>Delete</button>
            </ul>
          )
        })}

</center>


        </>
    )
}

export default ExpenseTrack;