import React, { useContext } from 'react';
import { Context } from '../../../Store/store'
import { SubContainer } from '../../../Components/Containers';
import { PageTitle } from '../../../Components/PageTitle';
import { EasyButton } from '../../../Components/Buttons';
import AddIcon from '@material-ui/icons/Add';
import { SearchTextInput, FormControl, FormRow } from '../../../Components/Forms';
import { useForm } from '../../../SelfHooks/useForm'

export const PageTitleAddSearch = (props) => {

    const { Theme } = useContext(Context);
    const { pages: { administratorsPage: { pageTitleAddSearch } } } = Theme;

    const [SearchWord, SearchWordhandler, SearchWordregExpResult] = useForm("", [""], [""]);

    if (!props.tableBasicContainerLessThan768) {
        return (
            <>
                <PageTitle>管理員名單</PageTitle>
                <FormControl theme={{}} onSubmit={(e) => { e.preventDefault(); props.execute(1, SearchWord); props.setSearchWord(SearchWord) }}>
                    <FormRow theme={pageTitleAddSearch.addAndSearchFormRow}>
                        <SubContainer theme={pageTitleAddSearch.addButtonSubContainer}>
                            <EasyButton
                                onClick={() => { props.setOpenAddJumpDialog(true) }}
                                theme={pageTitleAddSearch.addButton}
                                text={"新增帳號"} icon={<AddIcon style={{
                                    position: "relative",
                                    top: "0.3rem",
                                    height: "1.28rem"
                                }} />}
                            />
                        </SubContainer>
                        <SearchTextInput
                            value={SearchWord}
                            onChange={SearchWordhandler}
                            regExpResult={SearchWordregExpResult}
                            placeholder={"搜尋姓名、電話、Email"}
                            theme={pageTitleAddSearch.searchInput}
                            searchOnClick={() => { props.execute(1, SearchWord); props.setSearchWord(SearchWord) }}
                        />
                    </FormRow>
                </FormControl>
            </>
        )
    }
    else {
        return (
            <>
                <FormControl theme={{}} onSubmit={(e) => { e.preventDefault(); props.execute(1, SearchWord); props.setSearchWord(SearchWord) }}>
                    <FormRow theme={pageTitleAddSearch.addAndSearchFormRowLessThan768}>
                        <SearchTextInput
                            value={SearchWord}
                            onChange={SearchWordhandler}
                            regExpResult={SearchWordregExpResult}
                            placeholder={"搜尋姓名、電話、Email"}
                            theme={pageTitleAddSearch.searchInput}
                            searchOnClick={() => { props.execute(1, SearchWord); props.setSearchWord(SearchWord) }}
                        />
                        <SubContainer theme={pageTitleAddSearch.addButtonSubContainerLessThan768}>
                            <EasyButton
                                onClick={() => { props.setOpenAddJumpDialog(true) }}
                                theme={pageTitleAddSearch.addButtonLessThan768}
                                text={"新增帳號"} icon={<AddIcon style={{
                                    position: "relative",
                                    top: "0.3rem",
                                    height: "1.28rem"
                                }} />}
                            />
                        </SubContainer>
                    </FormRow>
                </FormControl>
            </>
        )
    }
}