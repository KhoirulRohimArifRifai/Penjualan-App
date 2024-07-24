import React, { Component } from 'react'
import { Col, Row, Button } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../utils/constants'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class TotalBayar extends Component {
    submitTotalBayar = (totalBayar) => {
        const pesanan = {
            total_harga : totalBayar,
            menus: this.props.keranjangs
        }
        axios.post(API_URL + "pesanans",pesanan).then((res) => {
        })
    };
    render() {
        const totalBayar = this.props.keranjangs.reduce(function (result, item) {
            return result + item.total_harga;
        }, 0);
        return (
            <div className="fixed-bottom">
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className="px-4" >
                        <h4>Total Bayar :<strong style={{ float: 'right' }}> Rp. {numberWithCommas(totalBayar)}</strong></h4>
                        <Button variant="primary" style={{ width: '100%' }} className="mb-3" 
                            onClick={()=> this.submitTotalBayar(totalBayar)}as={Link} to ="/sukses">
                            <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}
