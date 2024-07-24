import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap'
import { Hasil, ListCategories, Menus,  } from '../components';
import { API_URL } from '../utils/constants'
import axios from 'axios';
import Swal from 'sweetalert2'

export default class Homes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            menus: [],
            categoriYangDipilih: 'Makanan',
            keranjangs: [],
        }
    }

    componentDidMount() {
        axios
            .get(API_URL + "products?category.nama=" + this.state.categoriYangDipilih)
            .then(res => {
                const menus = res.data;
                this.setState({ menus });
            })
            .catch(error => {
                console.log(error);
            });

        axios
            .get(API_URL + "keranjangs")
            .then(res => {
                const keranjangs = res.data;
                this.setState({ keranjangs });
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidUpdate(prevState) {
        if (this.state.keranjangs !== prevState.keranjangs) {
            axios
                .get(API_URL + "keranjangs")
                .then(res => {
                    const keranjangs = res.data;
                    this.setState({ keranjangs });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    chageCategory = (value) => {
        this.setState({
            categoriYangDipilih: value,
            menus: []
        })

        axios
            .get(API_URL + "products?category.nama=" + value)
            .then(res => {
                const menus = res.data;
                this.setState({ menus });
            })
            .catch(error => {
                console.log(error);
            });
    }

    masukKeranjang = (value) => {

        axios
            .get(API_URL + "keranjangs?product.id=" + value.id)
            .then(res => {
                if (res.data.length === 0) {
                    const keranjang = {
                        jumlah: 1,
                        total_harga: value.harga,
                        product: value
                    }
                    axios
                        .post(API_URL + "keranjangs", keranjang)
                        .then(res => {
                            Swal.fire({
                                title: "Sukses",
                                text: "Menu " + keranjang.product.nama + " berhasil masuk keranjang.",
                                icon: "success"
                            });
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    const keranjang = {
                        jumlah: res.data[0].jumlah + 1,
                        total_harga: res.data[0].total_harga + value.harga,
                        product: value
                    };

                    axios
                        .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
                        .then(res => {
                            Swal.fire({
                                title: "Sukses",
                                text: "Menu " + keranjang.product.nama + " berhasil masuk keranjang.",
                                icon: "success"
                            });
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            })
            .catch(error => {
                console.log(error);
            });


    }

    render() {
        const { menus, categoriYangDipilih, keranjangs } = this.state;
        return (
                <div className="mt-3">
                    <Container fluid>
                        <Row>
                            <ListCategories chageCategory={this.chageCategory} categoriYangDipilih={categoriYangDipilih} />
                            <Col>
                                <h4><strong>Daftar Produk</strong></h4>
                                <hr />
                                <Row>
                                    {menus && menus.map((menu) => (
                                        <Menus
                                            key={menu.id}
                                            menu={menu}
                                            masukKeranjang={this.masukKeranjang}
                                        />
                                    ))}
                                </Row>
                            </Col>
                            <Hasil keranjangs={keranjangs} {...this.props} />
                        </Row>
                    </Container>
                </div>
        )
    }
}

