import React, {useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getAllProducts} from "../../actions/products";
import { Button, Form, Label, FormGroup, Container, Col, Input, Row} from 'reactstrap';
import { addCustomer } from '../../actions/customers';
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
      
      let date = new Date();
      date.setMonth(date.getMonth()+1)
      let newDate = date.toLocaleDateString("en-US")
      let installmentArr = installmentArray(Number(formState.installment));
      console.log(installmentArr);
      console.log(newDate)
      const newState = {name:formState.name, address:formState.address, receivedProducts:[{
        name:products[currentProduct].name,
        brand:products[currentProduct].brands[currentBrand].brand,
        model:products[currentProduct].brands[currentBrand].modelsPrices[currentModel].model,
        price : products[currentProduct].brands[currentBrand].modelsPrices[currentModel].price,
        installment:formState.installment,
        payment:formState.payment,
        remainingDebt : products[currentProduct].brands[currentBrand].modelsPrices[currentModel].price - formState.payment,
        firstInstallment : newDate,
        remainingInstallment: installmentArr
      }]}
      
      dispatch(addCustomer(newState));

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
    return (
          
          <Container>
            <Row>
              
              <Col>
              {products.map(product => <h4 onClick={() => {
                setCurrentBrand(-1)
                setCurrentModel(-1)
                setCurrentProduct(product.id - 1)
                
              }
                }>{product.name}</h4>)}
              </Col>
              <Col>{currentProduct !== -1 ?  products[currentProduct].brands.map(brand => <h4  onClick={() => {
                setCurrentModel(-1)
                setCurrentBrand(brand.id -1 )}}>{brand.brand}</h4>) : null}</Col>
              <Col>{currentBrand !== -1 ? products[currentProduct].brands[currentBrand].modelsPrices.map(mp => <h4 onClick={() => setCurrentModel(mp.id -1)}>{mp.model}</h4>) : null}</Col>
              <Col>{currentModel !== -1 ? <h4>{products[currentProduct].brands[currentBrand].modelsPrices[currentModel].price}</h4> : null}</Col>
              </Row>
              <Button onClick={() => setIsBuy(true)} disabled={currentProduct !== -1 && currentBrand !== -1 && currentModel !== -1 ? false : true}>Form Oluştur</Button>
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