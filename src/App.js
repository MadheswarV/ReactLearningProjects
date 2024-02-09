import './App.css';
import Footer from './Footer';
import Header from './Header';
import ItemList from './ItemList'
import AddItem from './AddItem'
import { useState } from "react";
import SearchItem from './SearchItem';

function App() {

  const initialListItems = ()=>{
    const initialItems = [
        {
            id:1,
            listItem:'Learn Something',
            isChecked:false
        },
        {
            id:2,
            listItem:'Youtube',
            isChecked:false
        },
        {
            id:3,
            listItem:'Job',
            isChecked:false
        },
        {
            id:4,
            listItem:'Exercise',
            isChecked:true
        },
    ]

    return initialItems;
}

const [listItem,setListItem] = useState(()=>initialListItems())

function handleCheckBox(receievedId){

    let modifiedList = listItem.map(item => 
        item.id === receievedId ? {...item,isChecked:!item.isChecked} : item
    )
    setListItem(modifiedList);

}

function handleDelete(receievedId){

    let afterDeleteList = listItem.filter(item =>
        item.id !== receievedId
    )
    setListItem(afterDeleteList);
}

const [newItem, setNewItem] = useState('');

const newListItem = (item)=>{
    const newId = listItem.length ? listItem[listItem.length - 1].id + 1 : 1;
    const newItem = {id:newId,isChecked:false,listItem:item};
    const newListItem = [...listItem,newItem]
    setListItem(newListItem);
}

function handleNewItemSubmit(e){
    e.preventDefault();
    if(!newItem){
        return;
    }
    console.log(newItem);
    setNewItem('')
    newListItem(newItem);
}

const [searchItem, setSearchItem] =useState('');

  return (
    <div>
    <Header />
    <AddItem
    handleNewItemSubmit = {handleNewItemSubmit}
    newItem = {newItem}
    setNewItem = {setNewItem}
    />
    <SearchItem 
    searchItem = {searchItem}
    setSearchItem = {setSearchItem}
    />
    <ItemList 
    listItem = {listItem.filter(x => x.listItem.toLowerCase().includes(searchItem.toLowerCase()))}
    setListItem = {setListItem}
    handleCheckBox = {handleCheckBox}
    handleDelete = {handleDelete}
    />
    <Footer 
    listItem = {listItem}
    />
    </div>
  );
}

export default App;
