import React, { useState, useEffect } from 'react'
import Bootbox from 'bootbox-react'

const Table = () => {

    const [countries, setCountries] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [extractHtml, setExtractHtml] = useState('.')

    useEffect(() => {
        getCountries()
    }, [])



    const getCountries = async () => {
        const response = await fetch('https://restcountries.com/v3.1/all')
        const countriesinfo = await response.json()
        countriesinfo.sort((a, b) => {
            if (a.name.official > b.name.official) {
                return 1
            }
            if (a.name.official < b.name.official) {
                return -1
            }
            return 0
        })
        setCountries(countriesinfo)
    }
    const getInfoCoutries = async (countryName) => {
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${countryName}`)
        const countryInfo = await response.json()
        setExtractHtml(countryInfo.extract_html)
    }

    const handleModal = (e, countryName) => {
        e.stopPropagation(); 
        e.preventDefault();
        
        getInfoCoutries(countryName)
        setModalVisible(true);
    }

    console.log(modalVisible, 'sadas');
    return (
        <div >
        
            <table className="table-primary">
                <thead>
                    <tr>
                        <th scope="col"> Official Names</th>
                        <th scope="col">Capital</th>
                        <th scope="col">Region</th>
                        <th scope="col">Language </th>
                        <th scope="col">Population </th>
                        <th scope="col">Flags </th>
                    </tr>
                </thead>
                <tbody>
                    {countries.map((country) => (
                        <tr key={country.name.official}>

                            <td style={{background: 'red'}}><a onClick={(e) => handleModal(e, country.name.official)}>{country.name.official}</a></td>
                            <td>{country?.capital}</td>
                            <td>{country.region}</td>
                            <td>{`${country.languages?.eng} ${country.languages?.mlt}`}</td>
                            <td>{country.population}</td>
                            <td> <img src={country.flags.png} alt='flags' /> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Bootbox
                show={modalVisible}
                type={"confirm"}
                message={`${extractHtml}`}
                onSuccess={() => setModalVisible(false)}
                onCancel={() => setModalVisible(false)}
                onClose={() => setModalVisible(false)}
            />
            </div>
        
    );
}

export default Table;