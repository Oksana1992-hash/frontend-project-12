import * as Yup from 'yup'

const getChannelsNamesSchema = (channelsNames, t) => Yup.object().shape({
  name: Yup.string()
    .trim()
    .required(t('errors.required'))
    .min(3, t('errors.symbolsLength'))
    .max(20, t('errors.symbolsLength'))
    .notOneOf(channelsNames, t('errors.mustBeUnique')),
})

export default getChannelsNamesSchema
