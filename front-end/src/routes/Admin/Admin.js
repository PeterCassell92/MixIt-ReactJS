import Button from "../../components/Button/Button"
import PageWrapper from "../../components/PageWrapper"
import {selectedTheme as theme } from "../../common/themes/theme"
import { Row } from "../../components/Flex"
import { emptyLocalStorage } from "../../common/storage"

function Admin() {
    return (
        <PageWrapper>
            <Row center>
            <Button text="erase data"
                color={theme.main.color.warning}
                onClick = {emptyLocalStorage}></Button>
            </Row>

            <div>Font made from
                <a href="http://www.onlinewebfonts.com">oNline Web Fonts</a>
            is licensed by CC BY 3.0</div>
        </PageWrapper>
    );
}

export default Admin;
