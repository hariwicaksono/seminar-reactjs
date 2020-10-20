import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

const TITLE = '404 Not Found - Seminar App'
const NotFound = () => (
  <>
   <Helmet>
      <title data-react-helmet="true">{ TITLE }</title>
    </Helmet>
    <Container>
    <Card className="shadow text-center" body>
      <img src="https://www.pngitem.com/pimgs/m/162-1622413_4chan-404-pages-hd-png-download.png" alt="" />
    <h1>404 - Not Found!</h1>
    <br/>
    <Link to="/">
      Go Home
    </Link>
    </Card>
    </Container>
  </>
);

export default NotFound;