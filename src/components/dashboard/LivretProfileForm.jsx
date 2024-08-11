import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {setLivret} from "../../stores/slices/livretSlice";
import {setSuccess, setError} from "../../stores/slices/livretSlice";

const LivretProfileForm = () => {
    const livret = useSelector(state => state.livret.livret);

    const [livretName, setLivretName] = useState(livret?.livret_name || '');
    const [description, setDescription] = useState(livret?.description || '');
    const [establishmentType, setEstablishmentType] = useState(livret?.establishment_type || '');
    const [establishmentName, setEstablishmentName] = useState(livret?.establishment_name || '');
    const [establishmentAddress, setEstablishmentAddress] = useState(livret?.establishment_address || '');
    const [establishmentPhone, setEstablishmentPhone] = useState(livret?.establishment_phone || '');
    const [establishmentEmail, setEstablishmentEmail] = useState(livret?.establishment_email || '');
    const [establishmentWebsite, setEstablishmentWebsite] = useState(livret?.establishment_website || '');
    const [instagram, setInstagram] = useState(livret?.instagram || '');
    const [facebook, setFacebook] = useState(livret?.facebook || '');
    const [linkedin, setLinkedin] = useState(livret?.linkedin || '');
    const [twitter, setTwitter] = useState(livret?.twitter || '');
    const [tripadvisor, setTripadvisor] = useState(livret?.tripadvisor || '');
    const [logo, setLogo] = useState(null);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        if (logo) {
            formData.append('logo', logo);
        }

        formData.append('livret_name', livretName);
        formData.append('description', description);
        formData.append('establishment_type', establishmentType);
        formData.append('establishment_name', establishmentName);
        formData.append('establishment_address', establishmentAddress);
        formData.append('establishment_phone', establishmentPhone);
        formData.append('establishment_email', establishmentEmail);
        formData.append('establishment_website', establishmentWebsite);
        formData.append('instagram', instagram);
        formData.append('facebook', facebook);
        formData.append('linkedin', linkedin);
        formData.append('twitter', twitter);
        formData.append('tripadvisor', tripadvisor);

        fetch(process.env.REACT_APP_API_URL + 'dashboard/profile/update_livret', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: formData,
        }).then(response => response.json())
            .then(data => {
                if (data.error) {
                    dispatch(setError({error: data.error}));
                    dispatch(setSuccess({success: ""}));
                } else {
                    dispatch(setSuccess({success: data.message}));
                    dispatch(setError({error: ""}));
                    dispatch(setLivret({livret: data.livret}));
                }
            })
            .catch(error => {
                dispatch(setError({error: error}));
                dispatch(setSuccess({success: ""}));
            })
    };

    return (
        <div className="col-12">
            <form id="update-livret-form" onSubmit={handleSubmit} className="p-5 bg-light rounded"
                  encType="multipart/form-data">
                <h3><i className="bi bi-info-circle"></i> Les informations du livret</h3>
                <div className="form-group">
                    <label htmlFor="livret_name" className="form-label"><i className="bi bi-building"></i>Nom du livret</label>
                    <input type="text" className="form-control" id="livret_name" name="livret_name" required
                           value={livretName} onChange={(e) => setLivretName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="form-label"><i className="bi bi-clipboard"></i> Description
                        du livret</label>
                    <textarea className="form-control" id="description" name="description" required rows="3"
                              value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="establishment_type">Type d'établissement</label>
                    <select className="form-control" id="establishment_type" name="establishment_type" required
                            value={establishmentType} onChange={(e) => setEstablishmentType(e.target.value)}>
                        <option disabled>-- Choisissez un type d'établissement --</option>
                        <option value="camping">Un camping</option>
                        <option value="chambre_hotes">Une chambre d'hôtes</option>
                        <option value="b&b">Une conciergerie B&B</option>
                        <option value="location">Un gestionnaire de location</option>
                        <option value="particulier">Un particulier</option>
                        <option value="gite">Un gîte</option>
                        <option value="hotel">Un hôtel</option>
                    </select>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label htmlFor="establishment_name" className="form-label"><i
                                className="bi bi-building"></i> Nom de l'établissement</label>
                            <input type="text" className="form-control" id="establishment_name"
                                   name="establishment_name" required value={establishmentName}
                                   onChange={(e) => setEstablishmentName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label htmlFor="establishment_address" className="form-label"><i
                                className="bi bi-geo-alt"></i> Adresse de l'établissement</label>
                            <input type="text" className="form-control" id="establishment_address"
                                   name="establishment_address" required value={establishmentAddress}
                                   onChange={(e) => setEstablishmentAddress(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label htmlFor="establishment_phone" className="form-label"><i
                                className="bi bi-telephone"></i> Téléphone de l'établissement</label>
                            <input type="text" className="form-control" id="establishment_phone"
                                   name="establishment_phone" required value={establishmentPhone}
                                   onChange={(e) => setEstablishmentPhone(e.target.value)}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label htmlFor="establishment_email" className="form-label"><i
                                className="bi bi-envelope"></i> Email de l'établissement</label>
                            <input type="email" className="form-control" id="establishment_email"
                                   name="establishment_email" required value={establishmentEmail}
                                   onChange={(e) => setEstablishmentEmail(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label htmlFor="establishment_website" className="form-label"><i
                                className="bi bi-globe"></i> Site web de l'établissement</label>
                            <input type="text" className="form-control" id="establishment_website"
                                   name="establishment_website" value={establishmentWebsite}
                                   onChange={(e) => setEstablishmentWebsite(e.target.value)}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label htmlFor="instagram" className="form-label"><i className="bi bi-instagram"></i> Lien
                                Instagram</label>
                            <input type="text" className="form-control" id="instagram" name="instagram"
                                   value={instagram} onChange={(e) => setInstagram(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label htmlFor="facebook" className="form-label"><i className="bi bi-facebook"></i> Lien
                                Facebook</label>
                            <input type="text" className="form-control" id="facebook" name="facebook" value={facebook}
                                   onChange={(e) => setFacebook(e.target.value)}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label htmlFor="linkedin" className="form-label"><i className="bi bi-linkedin"></i> Lien
                                Linkedin</label>
                            <input type="text" className="form-control" id="linkedin" name="linkedin" value={linkedin}
                                   onChange={(e) => setLinkedin(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label htmlFor="twitter" className="form-label"><i className="bi bi-twitter"></i> Lien
                                Twitter/X</label>
                            <input type="text" className="form-control" id="twitter" name="twitter" value={twitter}
                                   onChange={(e) => setTwitter(e.target.value)}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label htmlFor="tripadvisor" className="form-label"><i className="bi bi-link"></i> Lien
                                Tripadvisor</label>
                            <input type="text" className="form-control" id="tripadvisor" name="tripadvisor"
                                   value={tripadvisor} onChange={(e) => setTripadvisor(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    {livret?.logo && (
                        <>
                            <p>Avatar actuel</p>
                            <figure style={{borderRadius: '50%', overflow: 'hidden', width: '100px'}}>
                                <img src={process.env.REACT_APP_URL + livret.logo} alt="avatar"
                                     className="img-thumbnail" style={{width: '100px', objectFit: 'cover'}}/>
                            </figure>
                        </>
                    )}
                    <label htmlFor="logo" className="form-label"><i className="bi bi-image"></i> Logo de l'établissement</label>
                    <input type="file" className="form-control" id="logo" name="logo"
                           onChange={(e) => setLogo(e.target.files[0])}/>
                </div>
                <div className="form-group mt-3">
                    <button type="submit" className="btn btn-primary"><i className="bi bi-check-circle"></i> Enregistrer
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LivretProfileForm;
