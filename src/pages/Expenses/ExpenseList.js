const ExpenseList = (props) =>{
    console.log(props.items)
    return(
        <>
        {props.items.map((item)=>{
            return(
                <>
                    <ul key={item.id}>
                        <li>Money spent : {item.money}</li>
                        <li>description : {item.description}</li>
                        <li>category : {item.category}</li>
                    </ul>
                </>
            )
        })}
       
        </>
    )
}

export default ExpenseList;