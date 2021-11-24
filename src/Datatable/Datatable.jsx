import React, { useEffect, useMemo, useState } from 'react'
import PaginationCount from '../Pagination/PaginationCount'

function Datatable({users,handleDeleteUser}) {
    const [currentpage,setCurrentPage] = useState(1)
    const [itemsPerPage,setitemsPerPage] = useState(20)
    const [search,setSearch] = useState("")
    const [totalItems,setTotalItems] = useState(users.length)
    const [sortable,setSortable] = useState("")
    const [order,setOrder] = useState("asc")
    const [timeFormat,setTimeFormat] = useState("24hr")



    const onPageChange = (page) =>{
        if(page >= 1  && page <= Math.ceil(users.items.length/itemsPerPage))
        setCurrentPage(page)
    }

    const ConvertTime = (time) => {
        const time_part_array = time.split(":");
        let ampm = 'AM';
        if (time_part_array[0] >= 12) {
            ampm = 'PM';
        }
        if (time_part_array[0] > 12) {
            time_part_array[0] = time_part_array[0] - 12;
        }
        const formatted_time = time_part_array[0] + ':' + time_part_array[1] + ':' + time_part_array[2] + ' ' + ampm;

        return formatted_time
      }


    const userData = useMemo(()=>{
        let data = users.items
        if(search.length > 0){
            data = data.filter( item => {
                let name = item.firstName + item.lastName
                return name.toLowerCase().includes(search.toLowerCase())
            })
        }

        setTotalItems(data.length)
        
        if(currentpage == 0 && search.length == 0 ){
            setCurrentPage(1)
        }
        if(currentpage > Math.ceil(data.length/itemsPerPage) ||    (currentpage == 0 && data.length > 0)){
            setCurrentPage(Math.ceil(data.length/itemsPerPage))
        }

        if(sortable.length > 0){
            data.sort( (usera,userb) => {
                let UserA = ""
                let UserB = ""
                if(sortable == "name")
                {
                    UserA = usera.firstName.toLowerCase() + userb.lastName.toLowerCase()
                    UserB = userb.firstName.toLowerCase() + userb.lastName.toLowerCase()
                }
                if(sortable == "role"){
                    UserA = usera.role
                    UserB = userb.role
                }

                if(sortable == "date"){
                    return  order == "asc" ?  new Date(userb.createdDate.split("T")[0]) - new Date(usera.createdDate.split("T")[0]) : new Date(usera.createdDate.split("T")[0]) - new Date(userb.createdDate.split("T")[0])
                }

                if(order == 'asc')
                 return UserA < UserB ? -1 : 1
                 if(order == 'dec') 
                 return UserA > UserB ? -1 : 1
            } )
        }

        return data.slice((currentpage - 1) * itemsPerPage, (currentpage - 1) * itemsPerPage  + itemsPerPage)
    },[currentpage,search,sortable,order,timeFormat])

    
    const sort = (category) =>{
        setSortable(category)
        setOrder(order == 'asc' ? "dec" : "asc" )
    }

    const changeSelect = (e)=>{
        setTimeFormat(e.target.value)
    }
  return (
    <div>
        <div>
        {userData.length>0 && <PaginationCount onPageChange={ (page) => onPageChange(page)} itemperpage={itemsPerPage} totalItems={totalItems} currentPage={currentpage}></PaginationCount>}

            <div style={{display : "flex"}}>
                <div style={{width : "50%"}}>
                    <input style={{width : "100%", margin :"20px 0px", border : " 2px solid black", borderRadius : "5px", height : "40px"}} placeholder="Search by name" onChange={ (e) => {setSearch(e.target.value)}}></input>
                </div>
                <div style={{width : "40%" , display : 'flex', margin:'20px 0px 20px 100px'}}>
                    <span style={{ fontWeight : 900}}>Time format</span>
                    <select style={{width : "100%",  border : " 2px solid black", borderRadius : "5px", height : "40px"}} onChange={(event) => changeSelect(event)}>
                        <option value="24hr">24 hr</option>
                        <option value="12hr">12 hr</option>
                    </select>
                </div>
            </div>
            {
            userData.length >0 ?   
            <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Sno</th>
                        <th>MacId</th>
                        <th style={{width : '200px'}} onClick={() => sort('role') }>Role {sortable == 'role' && order == "asc" ? <div>&#709;</div>: <div>&#708;</div>}</th>
                        <th onClick={() => sort('name') }>Name {sortable == 'name' && order == "asc" ? <div>&#709;</div>: <div>&#708;</div>}</th>
                        <th onClick={() => sort('date') }>Created Date/Time {sortable == 'date' && order == "asc" ? <div>&#709;</div>: <div>&#708;</div>}</th>
                        {/* <th>Created Time</th> */}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        
                        userData.map((user, index) =>
                            <tr key={user.id}>
                                <td>{index+1}</td>
                                <td>{user.id}</td>
                                <td>{user.role}</td>
                                <td>{user.firstName + " "+ user.lastName}</td>
                                <td >{user.createdDate.split("T")[0]}{" / "}{timeFormat == "24hr" ? user.createdDate.split("T")[1].split("Z")[0] : ConvertTime(user.createdDate.split("T")[1].split("Z")[0])}</td>
                                {/* <td></td> */}
                                <td>
                                    {
                                        user.deleting ? <em> - Deleting...</em>
                                        : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                            : <span> - <a onClick={handleDeleteUser(user.id)}>Delete</a></span>
                                    }
                                </td>
                            </tr>
                        )
                        }
                </tbody>
            </table>
            </div> : <p style={{color : "red"}}> No Data record matching  {search} </p>
            }
        </div>
      
    </div>
  )
}

export default Datatable
