import { useState } from "react"
import { View , Text, StyleSheet,TextInput, Button,FlatList, Modal } from "react-native"
import uuid from 'react-native-uuid';

const App = () => {
  const [newTitleProduct,setNewTitleProduct] = useState ("")
  const [newPriceProduct,setNewPriceProduct] = useState ("")
  const [products, setProducts]= useState ([])
  const [productSelected,setProductSelected]=useState({})
  const [modalVisible,setModalVisible] = useState(false)

  const handlerAddProduct= () => {
    const newProduct ={
      id:uuid.v4(),
      title:newTitleProduct,
      price:newPriceProduct
    }
    setProducts(current => [...current,newProduct])
    setNewTitleProduct("")
    setNewPriceProduct("")
    console.log(products)
  }

  const  handlerModal= (item) => {
    setModalVisible(true)
    setProductSelected(item)
  }
  const handlerDeleteProduct = () => {
    setProducts(current => current.filter(product => product.id !== productSelected.id))
    setModalVisible(false)
  }
  
  

    return  <View  style={styles.container}>
              <View style={styles.inputContainer}>
{/* Cuadrado de Nombre de prodcuto */}
                <TextInput 
                style={styles.input}
                placeholder="Nombre"
                onChangeText={(t) => setNewTitleProduct (t)}
                value={newTitleProduct}
                />
{/* Cuadrado de precio de producto */}
                <TextInput 
                style={styles.input}
                placeholder="Precio"
                value={newPriceProduct}
                onChangeText={(t) => setNewPriceProduct (t)}
                />
{/* Boton de agregar */}
                <Button title="ADD" onPress={handlerAddProduct} />
              </View>
              <View style={styles.listContainer}>
              <FlatList
                  data={products}
                  keyExtractor={item => item.id}
                  renderItem={({item})=> <View style={styles.cardProduct}>
                                            <Text style={styles.cardTitle}>{item.title}</Text>
                                            <Text>{item.price} $</Text>
                                            <Button title="DEL" onPress={() => handlerModal(true)}/>
                                            </View> }
                                            />  
                </View>
{/* Boton confirmo y cerrarr */}                
<Modal
                visible={modalVisible}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                      <Text style={styles.modalText}>¿esta seguro que quiere borrar?</Text>
                      <Text style={styles.modalText}>{productSelected.title}</Text>
                      <Button title="Confirmo" onPress={handlerDeleteProduct} />
                      <Button title="Cerrar" onPress={()=>setModalVisible(false)}/>
                  </View>
               </View>
              </Modal>
           </View>

  }

  const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:"start",
      alignItems:"center",
      marginTop:30
    },
    inputContainer:{
      flexDirection:"row",
      alignItems:"center",
      width:"100%",
      justifyContent:"space-around"
    },
    input:{
      borderWidth:4,
      paddingHorizontal:10,
      paddingVertical:5,
      width:150
    },
    listContainer : {

      width:"100%"
    },
    cardProduct:{

      flexDirection:"row",
      padding:10,
      margin:10,
      justifyContent:"space-around",
      alignItems:"center",
      borderWidth:4
    },
    modalContainer:{
      flex:1,
      alignItems:"center",
      justifyContent:"center"
    },
    modalContent:{
      width:"80%",
      borderWidth:2,
      padding:10,
      gap:10
    },
    modalText:{
      textAlign:"center"
    }

 
  })




export default App