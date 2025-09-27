import React from 'react'

const MakeTicket = () => {

      const handleTicketSubmit = async (e) => {
            e.preventDefault();

      }


  return (
<>
      <h1>Make a ticket</h1>
      <form onSubmit={handleTicketSubmit}>
            <label>Title</label>
            <input placeholder='Write the issue you are facing' type='text'></input>
            <textarea
            cols={24}
            rows={8}
            >

            </textarea>
      <button>Post</button>
      </form>


</>

)
}

export default MakeTicket