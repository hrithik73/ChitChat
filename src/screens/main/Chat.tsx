import { API_KEY } from '@src/config/api';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [context, setContext] = useState('');

  const handleSend = async (newMessages = []) => {
    const userMessage = {
      _id: newMessages[0]._id,
      text: newMessages[0].text,
      createdAt: newMessages[0].createdAt,
      user: {
        _id: newMessages[0].user._id,
        name: newMessages[0].user.name,
      },
    };
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [userMessage]),
    );
    const message = newMessages[0].text;
    // const prompt = `User: ${message}\nBot:`;
    const prompt = [
      {
        text: `User: ${message}`,
        user: 'user',
      },
    ];
    console.log('prompt =====>', prompt);
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        // prompt: `User: ${message}\nBot:`,
        // messages:prompt,
        messages: [{ role: 'user', content: message }],
        max_tokens: 150,
        // n: 1,
        // stop: '\n',
        model: 'gpt-3.5-turbo',
      }),
    });
    const result = await response.json();
    if (!result || !result.choices || result.choices.length === 0) {
      console.error('Invalid response from OpenAI API:', result);
      return;
    }
    console.log('data =====>', JSON.stringify(result));
    // const botMessage = result.choices[0].message.content.trim();
    const botMessage = {
      _id: Math.random().toString(36).substring(7),
      text: result.choices[0].message.content.trim(),
      createdAt: new Date(),
      user: {
        _id: 'bot',
        name: 'Bot',
      },
    };
    console.log('botMessage =====>', JSON.stringify(botMessage));
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [botMessage]),
    );
    // setMessages(GiftedChat.append(messages, [
    //   {
    //     _id: Math.random().toString(36).substring(7),
    //     text: botMessage,
    //     createdAt: new Date(),
    //     user: {
    //       _id: 'bot',
    //       name: 'Bot',
    //     },
    //   },
    // ]));
    setContext(`${context}\n${prompt}${botMessage.text}`);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={handleSend}
          user={{
            _id: 'user',
          }}
          scrollToBottom={true}
          // quickReplyStyle={{ borderColor: 'red' }}
          renderQuickReplySend={() => {
            return <AntDesign name="send" size={20} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
