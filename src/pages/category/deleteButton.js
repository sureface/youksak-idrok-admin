import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import {deleteCategory} from "./query"
import {toast} from "react-toastify";

const DeleteButton = ({fetchCategories, id}) => {
  const [delLoading, setDelLoading] = useState(false)


  const deleteCategories = async (index) => {
    setDelLoading(true);
    const {data, error} = await deleteCategory(index)
    if(data) {
      toast.success("😌 bo'lim mofaqiyatli o'chirildi..!")
    }else if(error){
      console.log(error)
      toast.error("😩 xatolik yuz berdi..")
    }
    await fetchCategories();
    setDelLoading(false)
  }

  return (
      <div disabled={delLoading ? true : false} onClick={() => deleteCategories(id)} >
        O'chirish
      </div>
  )};

export default DeleteButton;
