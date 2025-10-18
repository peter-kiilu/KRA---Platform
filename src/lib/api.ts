import { supabase } from "@/integrations/supabase/client";

export const callKRAAssistant = async (message: string): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('kra-assistant', {
      body: { message }
    });

    if (error) {
      console.error('Supabase function error:', error);
      throw error;
    }

    return data.response || "I'm sorry, I couldn't process your request at the moment.";
  } catch (error) {
    console.error('Error calling KRA assistant:', error);
    throw error;
  }
};