import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import {deleteCategory} from "./query"

const DeleteButton = ({fetchCategories, id}) => {
  const [delLoading, setDelLoading] = useState(false)


  const deleteCategories = async (index) => {
    setDelLoading(true);
    const {data, error} = await deleteCategory(index)
    await fetchCategories();
    setDelLoading(false)
  }

  return (
      <div disabled={delLoading ? true : false} onClick={() => deleteCategories(id)} >
        O'chirish
      </div>
  )};

export default DeleteButton;
