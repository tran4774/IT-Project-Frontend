import React, {useEffect, useState} from "react";
import {Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {updateImage, uploadImage} from "../actions/upImageAction";
import "./formCss.css";
// import "./data.css"

var data = {
    itemLines: [],
    specialFields: [],
    summaryFields: [],
    type: "DAILY",
};

function Textract() {
    const dispatch = useDispatch();
    const [type, setType] = useState('DAILY');
    useEffect(() => {
        var sendData = {
            itemLines: [],
            specialFields: [],
            type: "DAILY",
        };
    }, []);
    var Num = 0;
    var flag = false;
    console.log(type)

    function showPreview(event) {
        if (event.target.files.length > 0) {
            var src = URL.createObjectURL(event.target.files[0]);
            setImage(event.target.files[0]);

            var preview = document.getElementById("file-ip-1-preview");
            // var inputBtn = document.getElementById("file-ip-1");
            // inputBtn.style.display="none"
            preview.src = src;
            preview.style.display = "block";
        }
    }

    const submitHandler = (e) => {
        e.preventDefault(); //dispatch login
        dispatch(uploadImage(image, type));
    };
    const [image, setImage] = useState();

    const [control, setControl] = useState({
        itemLines: [],
        specialFields: [],
        type: type,
    });

    const {loading, upImage} = useSelector((state) => state.uploadImage);
    const {putImage} = useSelector((state) => state.updateImage);

    useEffect(() => {
        setControl(upImage);
    }, [upImage]);
    if (upImage) {
        console.log(upImage.itemLines.length);
    }

    function submitHandlerFormItemLines(e) {
        e.preventDefault();
        let count = e.target.length - 1;

        let i = 0;
        while (i < count) {
            data.itemLines.push({
                item: e.target[i].value,
                price: e.target[i + 1].value,
            });

            i = i + 2;
        }

        console.log(data);
    }

    const divNumStyle = {
        display: "none",
    };

    function submitHandlerFormSpecialFields(e) {
        e.preventDefault();
        let count = e.target.length - 1;

        let i = 0;
        while (i < count) {
            data.specialFields.push({
                fieldName: e.target[i].value,
                value: e.target[i + 1].value,
            });

            i = i + 2;
        }
        console.log(data);
    }

    function itemHandler(e, item) {
        setControl({
            itemLines: control.itemLines.map((i) => {
                if (i.item === item.item) {
                    i.item = e.target.value;
                }
                return i;
            }),
            specialFields: control.specialFields,
            type: control.type,
        });
    }

    function priceHandler(e, item) {
        setControl({
            itemLines: control.itemLines.map((i) => {
                if (i.price === item.price) {
                    i.price = e.target.value;
                }
                return i;
            }),
            specialFields: control.specialFields,
            type: control.type,
        });
    }

    function fieldNameHandler(e, item) {
        setControl({
            itemLines: control.itemLines,
            specialFields: control.specialFields.map((i) => {
                if (i.fieldName === item.fieldName) {
                    i.fieldName = e.target.value;
                }
                return i;
            }),
            type: control.type,
        });
    }

    function valueHandler(e, item) {
        setControl({
            itemLines: control.itemLines,
            specialFields: control.specialFields.map((i) => {
                if (i.value === item.value) {
                    i.value = e.target.value;
                }
                return i;
            }),
            type: control.type,
        });
    }

    function confirmHandler(e) {
        e.preventDefault();
        dispatch(
            updateImage({
                itemLines: data.itemLines,
                specialFields: data.specialFields,
                summaryFields: upImage.summaryFields,
                type: type,
            })
        );
    }

    function handlePayment(uploaded) {
        const {itemLines, specialFields} = control;

        return (
            <div>
                <div className="layer"/>
                <main className="page-center">
                    <article className="">
                        <h3 className="sign-up__title" id="form1">Item line</h3>


                        <form
                            className="sign-up-form form"
                            onSubmit={submitHandlerFormItemLines}
                        >
                            {itemLines.map((item) => {
                                return (
                                    <label className="form-label-wrapper" style={{
                                        flexDirection: 'row'
                                    }}>
                                        <p className="form-label">Item</p>
                                        <input
                                            className="form-input"
                                            type="text"
                                            placeholder={item.item}
                                            required
                                            value={item.item}
                                            onChange={(e) => {
                                                itemHandler(e, item);
                                            }}
                                        />
                                        <p className="form-label">Price</p>
                                        <input
                                            className="form-input"
                                            type="text"
                                            placeholder={item.price}
                                            required
                                            value={item.price}
                                            onChange={(e) => {
                                                priceHandler(e, item);
                                            }}
                                        />
                                    </label>
                                );
                            })}

                            <button
                                className="form-btn primary-default-btn transparent-btn"
                                type="submit"
                            >
                                Check
                            </button>
                        </form>
                    </article>

                    <article className="">
                        <h1 className="sign-up__title">Special Fields</h1>

                        <form
                            className="sign-up-form form"
                            onSubmit={submitHandlerFormSpecialFields}
                        >
                            {specialFields.map((item) => {
                                return (
                                    <label className="form-label-wrapper" style={{
                                        flexDirection: 'row'
                                    }}>
                                        <p className="form-label">fieldName</p>
                                        <input
                                            className="form-input"
                                            type="text"
                                            placeholder={item.fieldName}
                                            required
                                            value={item.fieldName}
                                            onChange={(e) => {
                                                fieldNameHandler(e, item);
                                            }}
                                        />
                                        <p className="form-label">value</p>
                                        <input
                                            className="form-input"
                                            type="text"
                                            placeholder={item.value}
                                            required
                                            value={item.value}
                                            onChange={(e) => {
                                                valueHandler(e, item);
                                            }}
                                        />
                                    </label>
                                );
                            })}

                            <button
                                className="form-btn primary-default-btn transparent-btn"
                                type="submit"
                            >
                                Check
                            </button>
                        </form>
                    </article>


                    <button
                        className="form-btn primary-default-btn transparent-btn"
                        type="submit"
                        style={{
                            backgroundColor: 'rgb(221, 81, 69)'
                        }}
                        onClick={(e) => confirmHandler(e)}
                    >
                        Comfirm
                    </button>
                </main>
            </div>
        );
    }

    function handleShow() {
        return (
            <>
                <Row>
                    {" "}
                    <div className="users-table table-wrapper">
                        <a href="#form1">
                            <button
                                className="form-btn primary-default-btn transparent-btn float-end"

                                type="submit"
                                style={{
                                    backgroundColor: 'rgb(81, 221, 69)',
                                    width: '19%',
                                    marginLeft: '554px'
                                }}

                            >
                                Update
                            </button>
                        </a>


                        <h3>Item inline</h3>
                        <table className="posts-table">
                            <thead>
                            <tr className="users-table-info">
                                <th style={{
                                    width: '98px'
                                }}>

                                </th>
                                <th style={{
                                    width: '300px'
                                }}>Item
                                </th>
                                <th>Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            <div style={divNumStyle}> {(Num = 0)} </div>
                            {upImage.itemLines.map((i) => {
                                return (
                                    <tr>
                                        <td>
                                            <span> {++Num} </span>
                                        </td>
                                        <td>
                                            <span> {i.item} </span>
                                        </td>
                                        <td>
                                            <span> {i.price} </span>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </Row>

                <Row>
                    {" "}
                    <div className="users-table table-wrapper">
                        <h3>Special Field</h3>
                        <table className="posts-table">
                            <thead>
                            <tr className="users-table-info">
                                <th>

                                </th>
                                <th>Field name</th>
                                <th>Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            <div style={divNumStyle}> {(Num = 0)} </div>
                            {upImage.specialFields.map((i) => {
                                return (
                                    <tr>
                                        <td>
                                            <span> {++Num} </span>
                                        </td>
                                        <td>
                                            <span> {i.fieldName} </span>
                                        </td>
                                        <td>
                                            <span> {i.value} </span>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </Row>
                <Row>
                    {" "}
                    <div className="users-table table-wrapper">
                        <h3>Summary field</h3>
                        <table className="posts-table">
                            <thead>
                            <tr className="users-table-info">
                                <th>

                                </th>
                                <th>Field name</th>
                                <th>Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            <div style={divNumStyle}> {(Num = 0)} </div>
                            {upImage.summaryFields.map((i) => {
                                return (
                                    <tr>
                                        <td>
                                            <span> {++Num} </span>
                                        </td>
                                        <td>
                                            <span> {i.fieldName} </span>
                                        </td>
                                        <td>
                                            <span> {i.value} </span>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </Row>
            </>
        );
    }

    function handleUpdate() {
        flag = true;
        return (
            <>
                <Row>
                    {" "}
                    <div className="users-table table-wrapper">
                        <h3>Item inline</h3>
                        <table className="posts-table">
                            <thead>
                            <tr className="users-table-info">
                                <th>

                                </th>
                                <th><span>Item </span></th>
                                <th>Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            <div style={divNumStyle}> {(Num = 0)} </div>
                            {putImage.itemLines.map((i) => {
                                return (
                                    <tr>
                                        <td>
                                            <span> {++Num} </span>
                                        </td>
                                        <td>
                                            <span> {i.item} </span>
                                        </td>
                                        <td>
                                            <span> {i.price} </span>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </Row>
                <Row>
                    <div className="users-table table-wrapper">
                        <h3>Special Fields</h3>
                        <table className="posts-table">
                            <thead>
                            <tr className="users-table-info">
                                <th>

                                </th>
                                <th>Fieldsname</th>
                                <th>Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            <div style={divNumStyle}> {(Num = 0)} </div>
                            {putImage.specialFields.map((i) => {
                                return (
                                    <tr>
                                        <td>
                                            <span> {++Num} </span>
                                        </td>
                                        <td>
                                            <span> {i.fieldName} </span>
                                        </td>
                                        <td>
                                            <span> {i.value} </span>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </Row>

                <Row>
                    <div className="users-table table-wrapper">
                        <h3>Summary fields</h3>
                        <table className="posts-table">
                            <thead>
                            <tr className="users-table-info">
                                <th>

                                </th>
                                <th>Fieldsname</th>
                                <th>Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            <div style={divNumStyle}> {(Num = 0)} </div>
                            {putImage.summaryFields.map((i) => {
                                return (
                                    <tr>
                                        <td>
                                            <span> {++Num} </span>
                                        </td>
                                        <td>
                                            <span> {i.fieldName} </span>
                                        </td>
                                        <td>
                                            <span> {i.value} </span>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </Row>
            </>
        );
    }

    function showImageField() {
        return (
            <div className="col-lg-7">
                <div className="form-content">
                    <div className="form-items" style={{
                        maxHeight: '100vh',
                        overflow: 'scroll'
                    }}>
                        {upImage ? (
                            putImage ? (
                                handleUpdate()
                            ) : (
                                handleShow()
                            )
                        ) : (
                            <p></p>
                        )}
                        {control ? (
                            flag === true ? (
                                <p></p>
                            ) : (
                                handlePayment(upImage)
                            )
                        ) : (
                            <h3>Waiting...</h3>
                        )}
                    </div>
                </div>
            </div>

        )
    }

    return (
        <>
            <div className="use-bootstrap">
                <main className="main users chart-page" id="skip-target">
                    <>
                        <Row className=""></Row>

                        <div
                            className="row"
                            style={{
                                marginLeft: "18px",
                                marginRight: "10px",
                            }}
                        >
                            <div className="col-lg-5" style={{
                                maxHeight: '100vh',
                                overflow: 'scroll'
                            }}>

                                <form
                                    className="requires-validation"
                                    noValidate
                                    onSubmit={submitHandler}
                                >
                                    <div className="form-content">
                                        <div className="form-items">
                                            <h3>Import a image</h3>
                                            <div>
                                                <select name="type" id="type" onChange={e => setType(e.target.value)}>
                                                    <option value="DAILY">DAILY</option>
                                                    <option value="MONTHLY">MONTHLY</option>
                                                </select></div>
                                            <input
                                                style={{
                                                    width: "100%"
                                                }}
                                                type="file"
                                                id="file-ip-1"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    showPreview(e);
                                                }}
                                            />
                                            <div className="col-md-12">


                                                <img id="file-ip-1-preview" style={{width: "100%"}}/>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="form-button mt-3">
                                        <button
                                            style={{
                                                width: "91%",
                                                margin: "10px",
                                            }}
                                            className="form-btn primary-default-btn transparent-btn"
                                            type="submit"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-7">
                                <div className="form-content">
                                    <div className="form-items" style={{
                                        maxHeight: '80vh',
                                        overflow: 'scroll'
                                    }}>


                                        {upImage ? (
                                            putImage ? (
                                                handleUpdate()
                                            ) : (
                                                handleShow()
                                            )
                                        ) : (
                                            <p></p>
                                        )}
                                        {control ? (
                                            flag === true ? (
                                                <p></p>
                                            ) : (
                                                handlePayment(upImage)
                                            )
                                        ) : (
                                            <h3>Import image to show data !!!</h3>
                                        )}
                                    </div>
                                </div>
                            </div>


                        </div>


                        <Row>


                        </Row>
                    </>
                </main>
            </div>
        </>
    );
}

export default Textract;
