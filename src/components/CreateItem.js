import React from "react";
import styled, {css} from "styled-components";
import firebase from "firebase";
import categories from "categories";

import Card from "components/basic/Card";
import Button from "components/basic/Button";
import IconButton from "components/basic/IconButton";
import Input from "./basic/Input";
import LabeledInput from "components/basic/LabeledInput";
import Select from "components/basic/Select";
import Labeled, {Label} from "components/basic/Labeled";
import {mdiPencil} from "@mdi/js";
import {setLoading} from "App";
import Validation from "controller/Validation";

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
            name: {str: "", valid: false, touched: false},
            brand: {str: "", valid: false, touched: false},
            price: {str: "", valid: false, touched: false},
            stock: {str: "", valid: false, touched: false},
            category: {str: "", valid: false, touched: false},
            tags: "",
            image: {
                url: null,
                file: null,
            },
        };
    }

    imageRef = React.createRef();

    onChange = field => e => {
        const validation = {
            name: Validation.nonEmptyString,
            brand: Validation.nonEmptyString,
            stock: Validation.int({min: 1}),
            price: Validation.price,
            category: Validation.nonEmptyString,
        }

        if (validation.hasOwnProperty(field)) {
            this.setState({
                [field]: {
                    str: e.target.value,
                    valid: validation[field](e.target.value),
                    touched: true,
                },
            });
        } else {
            this.setState({
                [field]: e.target.value,
            });
        }
    }

    onBlur = field => () => {
        console.log("BLUR");
        this.setState(state => {
            state[field].touched = true;
            return state;
        });
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
        setLoading(true);

        const itemRef = await firebase.firestore().collection(`/items`).add({
            name: this.state.name.str,
            brand: this.state.brand.str,
            category: this.state.category.str,
            tags: this.state.tags.split(",").filter(t => t !== ""),
            stock: parseInt(this.state.stock.str),
            price: Math.floor(parseFloat(this.state.price.str) * 100),
            deleted: false,
        });

        const imageRef = firebase.storage().ref(`/items/${itemRef.id}`);
        await imageRef.put(this.state.image.file);
        await itemRef.update({
            image: await imageRef.getDownloadURL(),
        });

        setLoading(false);

        if (this.props.onCreated) this.props.onCreated();
    }

    render() {
        const canCreateItem =
            this.state.category.valid
            && this.state.name.valid
            && this.state.brand.valid
            && this.state.price.valid
            && this.state.stock.valid
            && this.state.image.file != null;

        return (
            <StyledCreateItem>
                <Image image={this.state.image.url}>
                    <EditImageButton onClick={this.pickImage}/>
                </Image>
                <Form>
                    <input type="file" accept="image/*" hidden ref={this.imageRef} onChange={this.onImageChange}/>

                    <LabeledInput label="name" onChange={this.onChange("name")} value={this.state.name.str}
                                  onBlur={this.onBlur("name")}
                                  invalid={!this.state.name.valid && this.state.name.touched}/>
                    <LabeledInput label="brand" onChange={this.onChange("brand")} value={this.state.brand.str}
                                  onBlur={this.onBlur("brand")}
                                  invalid={!this.state.brand.valid && this.state.brand.touched}/>

                    <Labeled label="Category" >
                        <Select value={this.state.category.str} onChange={this.onChange("category")}
                                onBlur={this.onBlur("category")}
                                invalid={!this.state.category.valid && this.state.category.touched}>
                            <option value={""}/>
                            {categories.map(c => (<option value={c.name} key={c.name}>{c.display}</option>))}
                        </Select>
                    </Labeled>

                    <LabeledInput label="tags" onChange={this.onChange("tags")} value={this.state.tags}/>
                    <LabeledInput label="price" onChange={this.onChange("price")} value={this.state.price.str}
                                  onBlur={this.onBlur("price")}
                                  invalid={!this.state.price.valid && this.state.price.touched}/>
                    <LabeledInput label="stock" onChange={this.onChange("stock")} value={this.state.stock.str}
                                  onBlur={this.onBlur("stock")}
                                  invalid={!this.state.stock.valid && this.state.stock.touched}/>

                    <Button disabled={!canCreateItem} onClick={this.createItem}>Create item</Button>
                </Form>
            </StyledCreateItem>
        );
    }
}
