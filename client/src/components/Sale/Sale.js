import React, {useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getAllProducts} from "../../actions/products";
import { Button, Form, Label, FormGroup, Container, Col, Input, Row} from 'reactstrap';
import { addCustomer } from '../../actions/customers';
import classes from "./Sale.module.css";
const Sale = () => {
    
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();

  const [currentProduct, setCurrentProduct] = useState(-1);
  const [currentBrand, setCurrentBrand] = useState(-1);
  const [currentModel, setCurrentModel] = useState(-1);
  const [formState, setFormState] = useState({
    name:"",
    address:"",
    installment:0,
    payment:0
  })
  


  const [isBuy, setIsBuy] = useState(false);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch])

    const changeHandler = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      setFormState({...formState, [name]:value});
    }
    const submitHandler = (e) => {
      e.preventDefault();
      let date = new Date();
      date.setMonth(date.getMonth()+1)
      let newDate = date.toLocaleDateString("en-US")
      let installmentArr = installmentArray(Number(formState.installment));
      
      const newState = {name:formState.name, address:formState.address, receivedProducts:[{
        name:currentProduct.name,
        brand:currentProduct.brands[currentBrand].brand,
        model:currentProduct.brands[currentBrand].modelsPrices[currentModel].model,
        price :currentProduct.brands[currentBrand].modelsPrices[currentModel].price,
        installment:formState.installment,
        payment:formState.payment,
        remainingDebt : currentProduct.brands[currentBrand].modelsPrices[currentModel].price - formState.payment,
        firstInstallment : newDate,
        remainingInstallment: installmentArr
      }]}
      
      dispatch(addCustomer(newState));
      console.log(newState);
      setIsBuy(false)
      setFormState({
                  name:"",
                  address:"",
                  installment:0,
                  payment:0
                })
    }

    const installmentArray = (installment) => {
      let arr = [];
      for(let i=0;i<installment;i++){
        arr.push(false)
      }
      return arr;
    }

    const changeProduct = (product) => {
      setCurrentProduct(product)
      setCurrentBrand(-1)
      setCurrentModel(-1)
    }

    const changeBrand = (brandName) =>{
      currentProduct.brands.forEach(brand => brand.brand === brandName && setCurrentBrand(currentProduct.brands.indexOf(brand)))
      setCurrentModel(-1)
    }

    const changeModel = (modelName) => {
      currentProduct.brands[currentBrand].modelsPrices.forEach(mp => mp.model === modelName && setCurrentModel(currentProduct.brands[currentBrand].modelsPrices.indexOf(mp)))
    }
    return (
          
          <Container>
            <Row>
              <Col>
              {products.map(product => <h4 onClick={() => changeProduct(product) } className={classes.customText} key={product._id}>{product.name}</h4>)}
              </Col>
              <Col>
              {currentProduct.brands && currentProduct.brands.map(brand => (<h4 onClick={() => changeBrand(brand.brand)}className={classes.customText} key={brand._id}>{brand.brand}</h4>))}
              </Col>
              <Col>
              {( currentBrand !== -1 && currentProduct.brands[currentBrand].modelsPrices) && currentProduct.brands[currentBrand].modelsPrices.map(mp => 
                (<h4 onClick={() => changeModel(mp.model)} className={classes.customText} key={mp._id}>{mp.model}</h4>)
                )}
              </Col>
              <Col>
              {( currentModel !== -1 && currentProduct.brands[currentBrand].modelsPrices[currentModel]) && <h4 className={classes.customText}>{currentProduct.brands[currentBrand].modelsPrices[currentModel].price}</h4>}
              </Col>
              
              </Row>
              <Button onClick={() => setIsBuy(true)}>Form Oluştur</Button>
              {isBuy && <Form onSubmit={submitHandler}>
                <FormGroup row>
        <Label for="name" sm={2}>İsim</Label>
        <Col sm={10}>
          <Input type="text" name="name" id="name" onChange={e => changeHandler(e)}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="address" sm={2}>Adres</Label>
        <Col sm={10}>
          <Input type="text" name="address" id="address" onChange={e => changeHandler(e)}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="installment" sm={2}>Taksit Sayısı</Label>
        <Col sm={10}>
          <Input type="text" name="installment" id="installment" onChange={e => changeHandler(e)}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="payment" sm={2}>Peşinat</Label>
        <Col sm={10}>
          <Input type="text" name="payment" id="payment" onChange={e => changeHandler(e)}/>
        </Col>
      </FormGroup>
      <Button >Satın Al</Button>
                </Form>}

          </Container>
    )
}

export default Sale