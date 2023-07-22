import React, { useState, useEffect } from "react";
import "./Todo.css";

// Get LS Data Back
const getAllDataFromLs = () => {
  const lists = localStorage.getItem("mytodosList");
  //console.log(lists);
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getAllDataFromLs());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // add Item Function
  const addItem = () => {
    if (!inputData) {
      alert("Please fill the Data");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((curItem) => {
          if (curItem.id === isEditItem) {
            return { ...curItem, name: inputData };
          } else {
            return curItem;
          }
        })
      );
      console.log(items);
      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  const editItem = (selectedEditBtnId) => {
    const edit_toDo_items = items.find((currentElem) => {
      return currentElem.id === selectedEditBtnId;
    });
    setInputData(edit_toDo_items.name);
    setIsEditItem(selectedEditBtnId);
    setToggleButton(true);
  };

  // Delete Items

  const deleteItem = (selectedBtnId) => {
    const updatedItems = items.filter((currElem) => {
      return currElem.id !== selectedBtnId;
    });
    setItems(updatedItems);
  };

  // Remove All Items

  const removeAll = () => {
    setItems([]);
  };

  // Adding Data to Local Storage
  useEffect(() => {
    localStorage.setItem("mytodosList", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="container text-center">
        <div className="row">
          <div className="col-md-12">
            <h1>
              <i className="bi bi-list-task"></i>
            </h1>
            <p>Add Your List Here....</p>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-12">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Add Items"
                value={inputData}
                onChange={(event) => setInputData(event.target.value)}
              />
              {toggleButton ? (
                <button
                  className="btn btn-primary"
                  type="button"
                  id="button-addon2"
                  onClick={addItem}
                >
                  <i className="bi bi-pencil-fill"></i>
                </button>
              ) : (
                <button
                  className="btn btn-secondary"
                  type="button"
                  id="button-addon2"
                  onClick={addItem}
                >
                  <i className="bi bi-plus"></i>
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {items.map((currItem) => {
              return (
                <React.Fragment key={currItem.id}>
                  <div className="row">
                    <div
                      className="d-flex align-items-center justify-content-between mb-3"
                      id="todoListContainer"
                    >
                      <p className="m-0">{currItem.name}</p>
                      <div className="col-md-2">
                        <button
                          className="btn btn-primary me-2"
                          type="button"
                          onClick={() => {
                            editItem(currItem.id);
                          }}
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button
                          className="btn btn-danger"
                          type="button"
                          onClick={() => {
                            deleteItem(currItem.id);
                          }}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12">
            <button
              className="btn btn-warning"
              type="button"
              id="myBtn"
              onClick={removeAll}
            >
              <span>CheckList</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
