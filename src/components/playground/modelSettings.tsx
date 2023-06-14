import { Stack, Box, ListSubheader } from '@mui/material';
import { ILLMSettings } from 'state/chat';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Slider from 'components/slider';
import { MuiChipsInput } from 'mui-chips-input';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { playgroundSettingsState } from 'state/playground';

const models = {
  GPT4: ['gpt-4'],
  'Chat GPT': ['gpt-3.5-turbo'],
  GPT3: ['text-davinci-003', 'text-davinci-002']
};

const ModelSettings = () => {
  const [settings, setSettings] = useRecoilState(playgroundSettingsState);

  const schema = yup.object({
    model_name: yup.string(),
    stop: yup.array().of(yup.string()),
    temperature: yup.number().min(0).max(1),
    top_p: yup.number().min(0).max(1),
    frequency_penalty: yup.number().min(0).max(1),
    presence_penalty: yup.number().min(0).max(1)
  });

  const formik = useFormik({
    initialValues: settings || ({} as ILLMSettings),
    validationSchema: schema,
    onSubmit: async () => undefined
  });

  useEffect(() => {
    if (settings) {
      formik.setValues(settings);
    }
  }, [settings]);

  useEffect(() => {
    setSettings(formik.values);
  }, [formik.values]);

  const modelSelect = (
    <Box>
      <InputLabel>Model</InputLabel>
      <Select
        fullWidth
        size="small"
        name="model_name"
        value={formik.values.model_name}
        onChange={formik.handleChange}
      >
        {Object.entries(models).map(([category, models]) => {
          const header = <ListSubheader>{category}</ListSubheader>;
          const items = models.map((m, i) => (
            <MenuItem key={i} value={m}>
              {m}
            </MenuItem>
          ));
          return [header, ...items];
        })}
      </Select>
    </Box>
  );

  const temperature = (
    <Slider
      label="Temperature"
      name="temperature"
      value={formik.values.temperature}
      onChange={formik.handleChange}
      min={0}
      max={1}
      step={0.1}
    />
  );

  const stopSequences = (
    <Box>
      <InputLabel>Stop sequences</InputLabel>
      <MuiChipsInput
        size="small"
        placeholder=""
        value={
          Array.isArray(formik.values.stop)
            ? formik.values.stop
            : [formik.values.stop]
        }
        onChange={(value) => formik.setFieldValue('stop', value)}
      />
    </Box>
  );

  const topP = (
    <Slider
      label="Top P"
      name="top_p"
      value={formik.values.top_p}
      onChange={formik.handleChange}
      min={0}
      max={1}
      step={0.1}
    />
  );

  const frequencyPenalty = (
    <Slider
      label="Frequency penalty"
      name="frequency_penalty"
      value={formik.values.frequency_penalty}
      onChange={formik.handleChange}
      min={0}
      max={1}
      step={0.1}
    />
  );

  const presencePenalty = (
    <Slider
      label="Presence penalty"
      name="presence_penalty"
      value={formik.values.presence_penalty}
      onChange={formik.handleChange}
      min={0}
      max={1}
      step={0.1}
    />
  );

  return (
    <Stack spacing={2} sx={{ width: '250px' }}>
      {modelSelect}
      {temperature}
      {stopSequences}
      {topP}
      {frequencyPenalty}
      {presencePenalty}
    </Stack>
  );
};

export default ModelSettings;
