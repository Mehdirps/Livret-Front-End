import React, {useEffect, useState} from 'react';

const HomeInfosModal = ({livret, homeInfos}) => {

    const [openModal, setOpenModal] = useState(true);
    const sessionLivretId = sessionStorage.getItem('livretId');
    const sessionOpenModal = sessionStorage.getItem('homeInfosModal');

    useEffect(() => {
        if (sessionOpenModal === 'true' && sessionLivretId === livret.id.toString()) {
            setOpenModal(false);
        }
    }, [sessionOpenModal, sessionLivretId, livret.id]);

    return (
        <>
            {
                openModal &&
                <>
                    <div className="modal fade show" id="homeInfosModal" tabIndex="-1"
                         aria-labelledby="homeInfosModalLabel"
                         aria-hidden="false" style={{display: 'block'}}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header bg-primary text-white">
                                    <button type="button" className="btn-close btn-close-white"
                                            data-bs-dismiss="homeInfosModal"
                                            aria-label="Close" onClick={() => {
                                        setOpenModal(false);
                                        sessionStorage.setItem('homeInfosModal', true);
                                        sessionStorage.setItem('livretId', livret.id);
                                    }}></button>
                                </div>
                                <div className="modal-body text-center">
                                    <h4 className="mb-3">Bienvenue !</h4>
                                    {homeInfos && (
                                        <>
                                            <h5 className="mb-2 text-primary">{homeInfos.name}</h5>
                                            <p className="lead">{homeInfos.text}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            }
        </>
    );
};

export default HomeInfosModal;
