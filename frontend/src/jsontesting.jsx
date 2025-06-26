import { useEffect,useState } from 'react';
import axios from 'axios';

function Json() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    city: ''
  });
const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/get-json')
      .then((response) => {
        setJsonData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching JSON:', error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendJSON = async () => {
    try {
      const res = await axios.post('http://localhost:3001/api/save-json', formData);
      alert('JSON stored successfully!');
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to store JSON.');
    }
  };

  return (
    <div>
    <div>
      <h2>Submit JSON Data</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="age" placeholder="Age" onChange={handleChange} />
      <input name="city" placeholder="City" onChange={handleChange} />
      <button onClick={sendJSON}>Submit</button>
    </div>
     <div>
      <h2>JSON Data from PostgreSQL</h2>
      {jsonData.map(item => (
        <pre key={item.id}>{JSON.stringify(item.data, null, 2)}</pre>
      ))}
    </div>
    </div>
  );
}

export default Json;
