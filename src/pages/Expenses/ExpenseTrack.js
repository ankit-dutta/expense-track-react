import { useRef } from "react";


const ExpenseTrack = () => {

    const amountRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();

    const addexpenseHandler = (event) =>{
          event.preventDefault()
        const enteredAmount = amountRef.current.value;
        const enteredDescription = descriptionRef.current.value;
        const enteredCategory = categoryRef.current.value;

        console.log("submit", enteredAmount,enteredCategory,enteredDescription)

        // const obj = {
        //     amount : enteredAmount,
        //     description : enteredDescription,
        //     category : enteredCategory

        // }
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

            <button>Add</button>


            
          </form>

         


        </>
    )
}

export default ExpenseTrack;