import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getAllCustomers, payInstallment} from "../../actions/customers";
import { Container, Col, Row, Input, Dropdown, Table, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const CustomerInfos = ({currentCustomer, setCurrentCustomer}) => {
  const customers = useSelector(state => state.customers);
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch])

    const changeInstallment = (isPaidInstallment, name, product) => {
      let customerName = name;
      let price = ((product.price-product.payment)/product.installment);
      let productName = product.name
      let firstInstallment = product.firstInstallment;
      dispatch(payInstallment(isPaidInstallment, price, customerName, productName, firstInstallment));
    }
    return (
        <Container>
            <Row>
                <Col xs="3">
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        Müşteriler
      </DropdownToggle>
      <DropdownMenu>
      {customers && customers.map(customer => <DropdownItem onClick={() => setCurrentCustomer(customer)}>{customer.name}</DropdownItem>)}
        
      </DropdownMenu>
    </Dropdown></Col>
                <Col xs="9">
                <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Adres</th>
          <th>Taksit sayısı</th>
          <th>Ödediği Peşinat</th>
          <th>Ürün adı</th>
          <th>Ürün markası</th>
          <th>Ürün modeli</th>
          <th>Ürün fiyatı</th>
          <th>İlk Taksit</th>
          <th>Kalan Taksit</th>
          <th>Kalan Borç</th>
        </tr>
      </thead>
      <tbody>
        
          {currentCustomer.receivedProducts && currentCustomer.receivedProducts.map(product => (
            <tr>
            <td>{currentCustomer.name}</td>
            <td>{currentCustomer.address}</td>
            <td>{product.installment}</td>
            <td>{product.payment}</td>
            <td>{product.name}</td>
            <td>{product.brand}</td>
            <td>{product.model}</td>
            <td>{product.price}</td>
            <td>{product.firstInstallment}</td>
            <td>{product.remainingInstallment.map(isPaidInstallment => isPaidInstallment ? <Input type="checkbox" checked />: <Input onChange={() => changeInstallment(isPaidInstallment, currentCustomer.name, product)} type="checkbox" />)}</td>
            <td>{product.remainingDebt}</td>

            </tr>
          ))}
        
       
      </tbody>
    </Table>
                </Col>
               
    </Row>
        </Container>
    )
}

export default CustomerInfos