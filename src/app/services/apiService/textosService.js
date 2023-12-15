import textosRepository from '../../repository/textosRepository';

const textosService = {
  getTexts: async () => {
    try {
      const texts = await textosRepository.getTexts();
      return textsModel(texts);
    } catch (error) {
      throw error;
    }
  },
  updateText: async (data) => {
    try {
      const updateText = await textosRepository.updateText(data);
      return updateTextModel(updateText);
    } catch (error) {
      throw error;
    }
  },
};

const textsModel = (data) => {
  const structure = data.map((item) => {
    return {
      ...item
    };
  });
  return structure;
};

const updateTextModel = (data) => {
  return {
    ...data
  };
};

export default textosService;
