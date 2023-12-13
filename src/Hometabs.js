import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './styles.css';
import ProdManagement from './ProductManagement';
import CatManagement from './CategoryManagement';
import StockManagement from './StockManagement';
import TransManagement from './TransactionManagement';
function NavTabs() {
  return (
    <>
    <Tabs
      defaultActiveKey="product"
      id="uncontrolled-tab"
      className="mb-3 custom-tabs"
      fill
    >
      
      <Tab eventKey="product" title="Product Management">
        <ProdManagement/>
      </Tab>
      <Tab eventKey="transaction" title="Transaction Management">
        <TransManagement/>
      </Tab>
      <Tab eventKey="stocks" title="Stocks Management">
        <StockManagement/>
      </Tab>
      <Tab eventKey="report" title="Transaction Report">
        Tab content for Transaction Report
      </Tab>
    </Tabs>
    </>
  );
}

export default NavTabs;