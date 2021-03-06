import {connect} from 'react-redux';

import {Settings} from '../components/SettingsComponent';

const mapStateToProps = state => ({
    isOpen: state.settingsModalIsOpen,
    value: state.caloriesSettingsValue,
    errors: state.settingErrors,
    ajaxInProgress: state.ajaxInProgress.setting
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export const SettingsContainer = connect(mapStateToProps, mapDispatchToProps)(Settings);
