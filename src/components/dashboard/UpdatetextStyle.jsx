import React from 'react';
import { useSelector } from 'react-redux';

const UpdatetextStyle = () => {
    const livret = useSelector(state => state.livret.livret);
    
    return (
        <>
            <button type="button" className="btn btn-secondary col-md-3" data-bs-toggle="modal" data-bs-target="#textDesignModal">
                Changer le design des textes
            </button>
            <div className="modal fade" id="textDesignModal" tabIndex="-1" aria-labelledby="textDesignModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="textDesignModalLabel">Changer le design des textes</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="fontColor" className="form-label">Couleur du texte</label>
                                    <input
                                        type="color"
                                        className="form-control"
                                        id="fontColor"
                                        name="fontColor"
                                        defaultValue={livret.text_color}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="fontFamily" className="form-label">Police d'écriture</label>
                                    <select
                                        className="form-control"
                                        id="fontFamily"
                                        name="fontFamily"
                                        defaultValue={livret.font}
                                    >
                                        <option style={{ fontFamily: 'Roboto, sans-serif' }} value="Roboto">Roboto</option>
                                        <option style={{ fontFamily: 'Open Sans, sans-serif' }} value="Open Sans">Open Sans</option>
                                        <option style={{ fontFamily: 'Lato, sans-serif' }} value="Lato">Lato</option>
                                        <option style={{ fontFamily: 'Montserrat, sans-serif' }} value="Montserrat">Montserrat</option>
                                        <option style={{ fontFamily: 'Raleway, sans-serif' }} value="Raleway">Raleway</option>
                                        <option style={{ fontFamily: 'Oswald, sans-serif' }} value="Oswald">Oswald</option>
                                        <option style={{ fontFamily: 'Source Sans Pro, sans-serif' }} value="Source Sans Pro">Source Sans Pro</option>
                                        <option style={{ fontFamily: 'Poppins, sans-serif' }} value="Poppins">Poppins</option>
                                        <option style={{ fontFamily: 'Noto Sans, sans-serif' }} value="Noto Sans">Noto Sans</option>
                                        <option style={{ fontFamily: 'Ubuntu, sans-serif' }} value="Ubuntu">Ubuntu</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn btn-primary">Sauvegarder les changements</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdatetextStyle;
