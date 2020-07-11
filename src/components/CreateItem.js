import React from "react";
import styled, {css} from "styled-components";
import firebase from "firebase";
import {pick} from "lodash";

import Card from "components/basic/Card";
import Button from "components/basic/Button";
import IconButton from "components/basic/IconButton";
import Input from "./basic/Input";
import {Label} from "./basic/LabeledInput";
import LabeledInput from "./basic/LabeledInput";
import {mdiPencil} from "@mdi/js";
import Icon from "@mdi/react";
import {setLoading} from "App";

const StyledCreateItem = styled(Card)`
    display: flex;
    flex-direction: column;
    width: 800px;
    padding: 0;
    box-shadow: none;
    align-items: stretch;
`;

const Form = styled.div`
    padding: 48px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    
    > * {
        margin-bottom: 12px;
        &:last-child {
            margin-top: 22px;
            margin-bottom: 0;
        }
    }
`;

const StyledLabeledInput = styled(LabeledInput)`
    ${Input} {
        font-size: 18px;
        padding: 12px 18px;
        border-radius: 9px;
    }
    
    ${Label} {
        margin-left: 8px;
    }
`;

const Image = styled.div`
    background: #b5c8d7;
    
    ${props => props.image && css`
        background: url("${props => props.image}") center;
    `}
    
    background-size: cover;
    height: 200px;
    border-radius: 24px 24px 0 0;
    position: relative;
`;

const EditImageButton = styled(IconButton).attrs(props => ({
    icon: mdiPencil,
}))`
    position: absolute;
    top: 24px;
    right: 24px;
`;

export default class CreateItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            brand: "",
            price: "",
            tags: "",
            stock: "",
            image: {
                url: null,
                file: null,
            },
        };
    }

    imageRef = React.createRef();

    onChange = field => e => {
        if (field === "price") {
            // Only allow one dot
            if (this.state.price.includes(".") && e.nativeEvent.data === '.') return;

            this.setState({price: e.target.value.replace(/[^\d.]/, '')});
        } else if (field === "stock") {
            this.setState({stock: e.target.value.replace(/\D/, '')});
        } else {
            this.setState({
                [field]: e.target.value,
            });
        }
    }

    pickImage = () => {
        this.imageRef.current.click();
    }

    onImageChange = e => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            alert("File is not an image");
            return;
        }

        this.setState({
            image: {
                file,
                url: URL.createObjectURL(file),
            }
        });
    }

    createItem = async () => {
        if(this.state.name === "") {
            alert("Must provide a name");
            return;
        }

        if(this.state.brand === "") {
            alert("Must provide a brand");
            return;
        }

        let tags = this.state.tags.split(",");
        tags = tags.filter(t => t !== "");

        const stock = parseInt(this.state.stock);
        if(isNaN(stock)) {
            alert("Invalid stock");
            return;
        }

        const price = Math.floor(parseFloat(this.state.price) * 100);
        if(isNaN(price)) {
            alert("Invalid price");
            return;
        }

        setLoading(true);

        const itemRef = await firebase.firestore().collection(`/items`).add({
            name: this.state.name,
            brand: this.state.brand,
            tags,
            stock,
            price,
            deleted: false,
        });

        const imageRef = firebase.storage().ref( `/items/${itemRef.id}`);
        await imageRef.put(this.state.image.file);
        await itemRef.update({
            image: await imageRef.getDownloadURL(),
        });

        setLoading(false);

        if(this.props.onCreated) this.props.onCreated();
    }

    render() {
        return (
            <StyledCreateItem>
                <Image image={this.state.image.url}>
                    <EditImageButton onClick={this.pickImage}/>
                </Image>
                <Form>
                    <input type="file" accept="image/*" hidden ref={this.imageRef} onChange={this.onImageChange}/>
                    <StyledLabeledInput onChange={this.onChange("name")}
                                        value={this.state.name}>Name</StyledLabeledInput>
                    <StyledLabeledInput onChange={this.onChange("brand")}
                                        value={this.state.brand}>Brand</StyledLabeledInput>
                    <StyledLabeledInput onChange={this.onChange("price")}
                                        value={this.state.price}>Price</StyledLabeledInput>
                    <StyledLabeledInput onChange={this.onChange("tags")}
                                        value={this.state.tags}>Tags</StyledLabeledInput>
                    <StyledLabeledInput onChange={this.onChange("stock")}
                                        value={this.state.stock}>Stock</StyledLabeledInput>
                    <Button onClick={this.createItem}>Create item</Button>
                </Form>
            </StyledCreateItem>
        );
    }
}
