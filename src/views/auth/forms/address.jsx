import React from 'react';
import ModalStyle from '../../../containers/Feedback/Modal/modal.style';
import Modals from '../../../components/feedback/modal';
import WithDirection from '../../../config/withDirection';
import { MDBInput } from 'mdbreact';
import Locations from 'phil-reg-prov-mun-brgy';

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

class Address extends React.Component {
    state = {
        visible: false,
        address: {
            region: undefined,
            province: undefined,
            municipality: undefined,
            baranggay: undefined
        },
        regions: [],
        provinces: [],
        municipalities: [],
        baranggays: [],
        full_address: undefined
    };

    componentDidMount() {
        let { regions } = this.state;
        regions = Locations.regions.map((region, index) => {
            return (<option key={`region-${index}`} value={`${region.name}.${region.reg_code}`}>{region.name}</option>);
        });
        this.setState({ regions })
    }

    toggle = () => {
        this.setState({
            visible: !this.state.visible
        });
    };

    submitHandler = () => {
        let { address, full_address } = this.state;
        full_address = `${address.region.split('.')[0]}, ${address.province.split('.')[0]}, ${address.municipality.split('.')[0]}, ${address.baranggay}`;
        this.setState({ full_address })
        this.props.onSubmit(address)
        this.toggle()
    }

    nextAddress(key, value) {
        let { provinces, municipalities, baranggays } = this.state;
        if (key === 'province') {
            provinces = Locations.getProvincesByRegion(value).map((province, index) => {
                return (<option key={`province-${index}`} value={`${province.name}.${province.prov_code}`}>{province.name}</option>);
            })
            this.setState({ provinces })
        } else if (key === 'municipality') {
            municipalities = Locations.getCityMunByProvince(value).map((municipality, index) => {
                return (<option key={`municipality-${index}`} value={`${municipality.name}.${municipality.mun_code}`}>{municipality.name}</option>)
            })
            this.setState({ municipalities })
        } else if (key === 'baranggay') {
            baranggays = Locations.getBarangayByMun(value).map((baranggay, index) => {
                return (<option key={`baranggay-${index}`} value={baranggay.name}>{baranggay.name}</option>)
            })
            this.setState({ baranggays })
        }
    }

    changeHandler = (event) => {
        let choices = ['province', 'municipality', 'baranggay'];
        let number;
        let { address } = this.state;
        let key = event.target.name;

        address[key] = event.target.value;

        if (key === 'region') {
            number = 0;
        } else if (key === 'province') {
            number = 1;
        } else if (key === 'municipality') {
            number = 2;
        }
        this.nextAddress(choices[number], event.target.value.split('.')[1]);

        this.setState({ address });
    }

    render() {
        const { region, province, municipality, baranggay } = this.state.address;

        return (
            <div>
                <MDBInput
                    type="text"
                    icon="map-marked-alt"
                    onClick={this.toggle}
                    value={this.state.full_address}
                    required
                />
                <Modal
                    visible={this.state.visible}
                    title="PERMANENT ADDRESS"
                    onCancel={this.toggle}
                    footer={null}
                >
                    <select
                        name="region"
                        value={region}
                        onChange={(event) => this.changeHandler(event)}
                        className="browser-default custom-select mb-2"
                        required
                    >
                        <option value=''></option>
                        {this.state.regions}
                    </select>
                    <select
                        name="province"
                        value={province}
                        onChange={(event) => this.changeHandler(event)}
                        className="browser-default custom-select mb-2"
                        required
                    >
                        <option value=''></option>
                        {this.state.provinces}
                    </select>
                    <select
                        name="municipality"
                        value={municipality}
                        onChange={(event) => this.changeHandler(event)}
                        className="browser-default custom-select mb-2"
                        required
                    >
                        <option value=''></option>
                        {this.state.municipalities}
                    </select>
                    <select
                        name="baranggay"
                        value={baranggay}
                        onChange={(event) => this.changeHandler(event)}
                        className="browser-default custom-select mb-2"
                        required
                    >
                        <option value=''></option>
                        {this.state.baranggays}
                    </select>
                    <div className="text-center mt-4">
                        <button className="btn btn-primary" onClick={this.submitHandler}>
                            SUBMIT ADDRESS
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Address;
