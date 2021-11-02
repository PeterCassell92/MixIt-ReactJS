import Button from "../../components/Button"
import PageWrapper from "../../components/PageWrapper"
import { Row } from "../../components/Flex"
import { emptyLocalStorage } from "../../common/storage"

function Admin() {



    return (
        <PageWrapper>
            <Row center>
            <Button text="erase data"
                color="var(--secondary)"
                onClick = {emptyLocalStorage}></Button>
            </Row>
        </PageWrapper>
    )
}

export default Admin
